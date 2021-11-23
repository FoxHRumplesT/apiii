import { Controller } from '@nestjs/common';
import { Request } from 'express';
// import { OrderDetailService } from './orderDetail.service';
// import { OrderDetail } from '../../entities';

@Controller('/order-detail')
export class OrderDetailController {
  // constructor(private readonly orderDetailService: OrderDetailService) {}

  // @Post()
  // @HttpCode(200)
  // public async create(@Req() req: Request): Promise<OrderDetail> {
  //   return await this.orderDetailService.create(req.body);
  // }
}
