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
import {
  Allie,
  AllieStep,
  AllieDetailType,
  OrderDetail,
  AllieDetailCategory,
  AllieMenuAllieDetail
} from './';

@Entity('AllieDetail')
export class AllieDetail {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint', {
    nullable: true
  })
  allieId: number;

  @Column('bigint')
  allieStepId: number;

  @Column('bigint')
  allieDetailTypeId: number;

  @Column('bigint', {
    nullable: true
  })
  allieDetailCategoryId: number;

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

  @ManyToOne(() => Allie, (allie: Allie) => allie.allieDetails, {})
  @JoinColumn({ name: 'allieId' })
  allie: Allie | null;

  @ManyToOne(() => AllieStep, (allieStep: AllieStep) => allieStep.allieDetails, {})
  @JoinColumn({ name: 'allieStepId' })
  allieStep: AllieStep | null;

  @ManyToOne(() => AllieDetailType, (allieDetailType: AllieDetailType) => allieDetailType.allieDetails, {})
  @JoinColumn({ name: 'allieDetailTypeId' })
  allieDetailType: AllieDetailType | null;

  @ManyToOne(() => AllieDetailCategory, (allieDetailCategory: AllieDetailCategory) => allieDetailCategory.allieDetails, {})
  @JoinColumn({ name: 'allieDetailCategoryId' })
  allieDetailCategory: AllieDetailCategory | null;

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.allieDetail)
  orderDetails: OrderDetail[];

  @OneToMany(() => AllieMenuAllieDetail, (allieMenuAllieDetail: AllieMenuAllieDetail) => allieMenuAllieDetail.allieDetail)
  allieMenuAllieDetails: AllieMenuAllieDetail[];

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
