import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../entities';
import { OrderDetailService } from '../order-detail/orderDetail.service';
import * as Dto from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private orderDetailService: OrderDetailService
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
}
