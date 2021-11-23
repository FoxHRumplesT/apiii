import { CreateOrderDetailDto } from '../../order-detail/dto';

export interface CreateDto {
  allieId: number;
  userId: number;
  total: number;
  subtotal: number;
  pickupAt: Date;
  orderDetail: CreateOrderDetailDto[]
}
