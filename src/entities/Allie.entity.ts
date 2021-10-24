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
import { AllieType } from './allieType.entity';
import { AllieStep } from './allieStep.entity';
import { Order } from './order.entity';

@Entity('Allie')
export class Allie {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint')
  allieTypeId: number;

  @Column('varchar', {
    length: 200
  })
  name: string;

  @Column('varchar', {
    length: 200
  })
  description: string;

  @Column('varchar', {
    length: 255
  })
  imageUrl: string;

  @Column('varchar', {
    length: 200
  })
  latitude: string;

  @Column('varchar', {
    length: 200
  })
  longitude: string;

  @Column('timestamptz', {
    nullable: true
  })
  deliveredAt: Date;

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

  @ManyToOne(() => AllieType, (allieType: AllieType) => allieType.allies, {})
  @JoinColumn({ name: 'allieTypeId' })
  allieType: AllieType | null;

  @OneToMany(() => AllieStep, (allieStep: AllieStep) => allieStep.allie)
  allieSteps: AllieStep[];

  @OneToMany(() => Order, (order: Order) => order.allie)
  orders: Order[];

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
