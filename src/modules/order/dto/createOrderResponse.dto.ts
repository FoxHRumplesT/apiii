import {
  OrderDetail,
  Allie,
  User
} from '../../../entities';

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
