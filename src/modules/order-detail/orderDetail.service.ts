import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from '../../entities/order-detail.entity';
import * as Dto from './dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  public async create(body: Dto.CreateOrderDetailDto[]): Promise<OrderDetail[]> {
    const orderDetailEntities: OrderDetail[] = []
    body.forEach((item) => {
      let orderDetailEntity = new OrderDetail();
      orderDetailEntity.orderId = item.orderId;
      orderDetailEntity.allieDetailId = item.allieDetailId;
      orderDetailEntity.name = item.name;
      orderDetailEntity.imageUrl = item.imageUrl;
      orderDetailEntities.push(orderDetailEntity);
    });
    return await this.orderDetailRepository.save(orderDetailEntities);
  }

  public async cancel(ids: number[]): Promise<string> {
    const detailsEntity = ids.map((item) => {
      const orderDetailEntity = new OrderDetail;
      orderDetailEntity.id = item,
      orderDetailEntity.deletedAt = new Date();
      return orderDetailEntity;
    });
    await this.orderDetailRepository.save(detailsEntity);
    return 'Details was be cancel';
  }
}
