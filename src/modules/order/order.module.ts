import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetailModule } from '../order-detail/orderDetail.module';
import { AllieDetailModule } from '../allie-detail/allieDetail.module';
import { Order } from '../../entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    OrderDetailModule,
    AllieDetailModule
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
