import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm';

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

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
