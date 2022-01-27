import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Allie, User, OrderDetail, State } from './';

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint', {
    default: 1
  })
  stateId: number;

  @Column('bigint')
  allieId: number;

  @Column('bigint')
  userId: number;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    default: 0
  })
  total: number;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    default: 0
  })
  subtotal: number;

  @Column('timestamptz', {
    nullable: true
  })
  pickupAt: Date;

  @Column('timestamptz', {
    nullable: true
  })
  createdAt: Date;

  @Column('timestamptz', {
    nullable: true
  })
  updatedAt: Date;

  @Column('timestamptz', {
    nullable: true
  })
  deletedAt: Date;

  @ManyToOne(() => State, (state: State) => state.orders, {})
  @JoinColumn({ name: 'stateId' })
  state: State | null;

  @ManyToOne(() => Allie, (allie: Allie) => allie.orders, {})
  @JoinColumn({ name: 'allieId' })
  allie: Allie | null;

  @ManyToOne(() => User, (user: User) => user.orders, {})
  @JoinColumn({ name: 'userId' })
  user: User | null;

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  beforeSave() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
