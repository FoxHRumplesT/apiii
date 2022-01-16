import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
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
    console.log(initDate, endDate);
    const countUser = await this.orderRepository.createQueryBuilder('order')
      .where(`order.createdAt BETWEEN :initDate AND :endDate `, { initDate, endDate})
      .andWhere('order.allieId = :allieId', { allieId })
      .andWhere('order.deletedAt IS NULL')
      .groupBy('order.userId')
      .getCount()
    const countTotal = await this.orderRepository.createQueryBuilder('order')
      .where(`order.createdAt BETWEEN :initDate AND :endDate `, { initDate, endDate})
      .andWhere('order.allieId = :allieId', { allieId })
      .andWhere('order.deletedAt IS NULL')
      .getCount()
    console.log(countUser);
    console.log(countTotal);
    return {
      orderTotal: countTotal,
      customerTotal: countUser,
    }
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
}
