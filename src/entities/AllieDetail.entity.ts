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
import { AllieStep } from './allieStep.entity';
import { AllieDetailType } from './allieDetailType.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity('AllieDetail')
export class AllieDetail {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint')
  allieStepId: number;

  @Column('bigint')
  allieDetailTypeId: number;

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

  @ManyToOne(() => AllieStep, (allieStep: AllieStep) => allieStep.allieDetails, {})
  @JoinColumn({ name: 'allieStepId' })
  allieStep: AllieStep | null;

  @ManyToOne(() => AllieDetailType, (allieDetailType: AllieDetailType) => allieDetailType.allieDetails, {})
  @JoinColumn({ name: 'allieDetailTypeId' })
  allieDetailType: AllieDetailType | null;

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.allieDetail)
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
