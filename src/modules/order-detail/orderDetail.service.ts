import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from '../../entities';
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
}
