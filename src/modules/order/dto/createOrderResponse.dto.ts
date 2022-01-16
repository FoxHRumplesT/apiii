import { OrderDetail } from '../../../entities/order-detail.entity';
import { Allie } from '../../../entities/allie.entity';
import { User } from '../../../entities/user.entity';

export interface CreateOrderResponse {
  id: number;
  allieId: number;
  userId: number;
  total: number;
  subtotal: number;
  pickupAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  allie: Allie;
  user: User;
  orderDetails: OrderDetail[];
}
