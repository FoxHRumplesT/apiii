import { Controller, Post, Get, Req, HttpCode } from '@nestjs/common';
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
}