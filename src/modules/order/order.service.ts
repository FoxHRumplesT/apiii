import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
