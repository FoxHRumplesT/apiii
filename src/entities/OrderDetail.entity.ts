import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm';

@Entity('OrderDetail')
export class OrderDetail {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint')
  orderId: number;

  @Column('bigint')
  allieDetailId: number;

  @Column('varchar', {
    length: 200
  })
  name: string;

  @Column('varchar', {
    length: 255
  })
  imageUrl: string;

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
