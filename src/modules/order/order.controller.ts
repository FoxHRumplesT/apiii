import {
  Controller,
  Post,
  Put,
  Get,
  Req,
  HttpCode,
  Body,
  Param
} from '@nestjs/common';
import { Request } from 'express';
import { OrderService } from './order.service';
import { Order } from '../../entities';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<Order> {
    return await this.orderService.create(req.body);
  }

  @Get()
  public async findAll(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Get('status/:userId')
  public async findStatus(@Param() params: { userId: number }): Promise<any> {
    return await this.orderService.findStatus(params.userId);
  }

  @Put('cancel')
  public async cancel(@Body() body: { orderId: number }): Promise<string> {
    return await this.orderService.cancel(body.orderId);
  }
}
