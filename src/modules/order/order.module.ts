import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetailModule } from '../order-detail/orderDetail.module';
import { Order } from '../../entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    OrderDetailModule
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
