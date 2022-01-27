import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import momentTz from 'moment-timezone';
import { Order } from '../../entities';
import { OrderDetailService } from '../order-detail/orderDetail.service';
import { AllieDetailService } from '../allie-detail/allieDetail.service';
import * as Dto from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderDetailService: OrderDetailService,
    private allieDetailService: AllieDetailService
  ) {}

  public async create(body: Dto.CreateDto): Promise<any> {
    let orderEntity = new Order();
    orderEntity.allieId = body.allieId;
    orderEntity.userId = body.userId;
    orderEntity.total = body.total;
    orderEntity.subtotal = body.subtotal;
    orderEntity.pickupAt = body.pickupAt;
    const createOrder = await this.orderRepository.save(orderEntity);
    const createDetails = await this.orderDetailService.create(body.orderDetail.map((item) => {
      return {
        orderId: createOrder.id,
        allieDetailId: item.id,
        name: item.name,
        imageUrl: item.imageUrl
      }
    }));
    return {
      ...createOrder,
      orderDetails: createDetails
    };
  }

  public async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  public async findStatus(userId: number): Promise<any> {
    const order = await this.orderRepository.createQueryBuilder('order')
      .innerJoinAndSelect('order.orderDetails', 'orderDetails')
      .innerJoinAndSelect('order.user', 'user')
      .where('order.userId = :userId', { userId })
      .andWhere('order.deletedAt IS NULL')
      .andWhere('orderDetails.deletedAt IS NULL')
      .orderBy('order.id', 'DESC')
      .limit(1)
      .getOne()
    const orderCount = await this.orderRepository.count({
      userId,
      deletedAt: null
    });
    const findAllieDetail = await this.allieDetailService.findByIds(
      order.orderDetails.map((item) => item.allieDetailId)
    );

    return {
      id: order.id,
      userId: order.userId,
      pickupAt: order.pickupAt,
      totalOrders: orderCount,
      userAdress: 'Avenida siempre viva',
      stateId: 1,
      state: {
        id: 1,
        name: 'Recibido'
      },
      steps: findAllieDetail
    };
  }

  public async findBussinesResum(initDate: string, endDate: string, allieId: number) {
    const totalCustomers = await this.orderRepository.createQueryBuilder('order')
      .where(`order.createdAt BETWEEN :initDate AND :endDate `, { initDate, endDate })
      .andWhere('order.allieId = :allieId', { allieId })
      .andWhere('order.deletedAt IS NULL')
      .groupBy('order.userId')
      .getCount()
    const totalOrders = await this.orderRepository.createQueryBuilder('order')
      .where(`order.createdAt BETWEEN :initDate AND :endDate `, { initDate, endDate })
      .andWhere('order.allieId = :allieId', { allieId })
      .andWhere('order.deletedAt IS NULL')
      .getCount()
    return {
      totalOrders,
      totalCustomers,
      totalPrice: 10000
    }
  }

  public async findOrderResum(allieId: number) {
    const nowDate = momentTz().utc().format();
    const findCountStates = await this.orderRepository.createQueryBuilder('order')
      .select('order.state, count(*)')
      .where('order.allieId = 1')
      .andWhere('order.deletedAt IS NULL')
      .groupBy('order.stateId')
      .execute();
    const getComplete = findCountStates.find((a) => Number(a.stateId) === 3);
    const getCancel = findCountStates.find((a) => Number(a.stateId) === 4);
    return {
      completeOrders: getComplete.count || '0',
      cancelOrders: getCancel.count || '0'
    }
  }

  public async findHistory(initDate: string, endDate: string, allieId: number): Promise<Dto.HistoryResponseDto[]> {
    const getHistory = await this.orderRepository.createQueryBuilder('order')
      .innerJoinAndSelect('order.state', 'state')
      .where(`order.createdAt BETWEEN :initDate AND :endDate `, { initDate, endDate })
      .andWhere('order.allieId = :allieId', { allieId })
      .andWhere('order.deletedAt IS NULL')
      .getMany();
    return getHistory.map((item) => {
      return {
        date: momentTz(item.createdAt).tz('America/Bogota').format('DD/MM/YYYY'),
        orderId: item.id,
        stateId: item.stateId,
        state: item.state.name || '',
        pickupAt: momentTz(item.pickupAt).tz('America/Bogota').format('HH:mm'),
      }
    })
  }

  public async findOrdersByAllie(allieId: number) {
    const orderMap = new Map();
    const orderArray = [];
    const getOrders = await this.orderRepository.createQueryBuilder('order')
      .select(
        'order.id as "orderId", ' +
        'state.name, ' +
        'state.id as "stateId", ' +
        'order.createdAt, ' +
        'orderDetail.allieDetailId as "orderDetailId"'
      )
      .innerJoin('order.state', 'state')
      .innerJoin('order.orderDetails', 'orderDetail')
      .where('order.allieId = :allieId', { allieId })
      .andWhere('order.deletedAt IS NULL')
      .execute()
    getOrders.map((item) => {
      orderMap.set(item.orderId, item);
    })
    const skus = getOrders.map((item) => Number(item.orderDetailId));
    const getDetails = await this.allieDetailService.findByIds(skus);
    orderMap.forEach(async(item) => {
      const detailsReturn = [];
      const findDetails = getOrders.filter((compare) => Number(compare.orderId) === Number(item.orderId));

      getDetails.forEach((itemStep) => {
        const detailsObject = [];

        itemStep.details.forEach((itemDetail) => {
          const compareDetail = findDetails.find((a) => Number(a.orderDetailId) === Number(itemDetail.id));
          if (compareDetail) {
            detailsObject.push(itemDetail);
          }
        });

        if (detailsObject.length > 0) {
          detailsReturn.push({
            ...itemStep,
            details: detailsObject
          });
        }
      });

      orderArray.push({
        id: item.orderId,
        stateId: item.stateId,
        state: item.name,
        date: momentTz(item.pickupAt).tz('America/Bogota').format('HH:mm'),
        steps: detailsReturn
      })
    });
    return orderArray;
  }

  public async cancel(orderId: number): Promise<string> {
    const findOrder = await this.orderRepository.createQueryBuilder('order')
      .innerJoinAndSelect('order.orderDetails', 'orderDetails')
      .where('order.id = :orderId', { orderId })
      .andWhere('order.deletedAt IS NULL')
      .andWhere('orderDetails.deletedAt IS NULL')
      .getOne()
    const deleteDetails = await this.orderDetailService.cancel(
      findOrder.orderDetails.map((items) => items.id)
    );
    const orderEntity = new Order();
    orderEntity.id = findOrder.id;
    orderEntity.deletedAt = new Date();
    await this.orderRepository.save(orderEntity);
    return `Order ${orderId} was be cancel`;
  }

  public async updateState(body: { orderId: number, stateId: number }): Promise<Order> {
    const findOrder = await this.orderRepository.findOne({
      id: body.orderId
    });
    findOrder.stateId = body.stateId;
    return await this.orderRepository.save(findOrder);
  }
}
