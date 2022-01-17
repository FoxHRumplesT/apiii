import {
  Controller,
  Post,
  Put,
  Get,
  Req,
  Query,
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

  //Post services
  @Post()
  @HttpCode(200)
  public async create(@Req() req: Request): Promise<Order> {
    return await this.orderService.create(req.body);
  }

  // Get services
  @Get()
  public async findAll(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Get('status/:userId')
  public async findStatus(@Param() params: { userId: number }): Promise<any> {
    return await this.orderService.findStatus(params.userId);
  }

  @Get('bussines-resum')
  public async findBussinesResum(@Query() query: {
    initDate,
    endDate,
    allieId
  }) {
    return await this.orderService.findBussinesResum(
      query.initDate,
      query.endDate,
      query.allieId
    );
  }

  @Get('order-resum/:allieId')
  public async findOrderResum(@Param() param: { allieId: number }) {
    return await this.orderService.findOrderResum(param.allieId);
  }

  @Get(':allieId')
  public async findOrdersByAllie(@Param() param: { allieId: number }) {
    return await this.orderService.findOrdersByAllie(param.allieId);
  }

  // Put services
  @Put('cancel')
  public async cancel(@Body() body: { orderId: number }): Promise<string> {
    return await this.orderService.cancel(body.orderId);
  }
}
