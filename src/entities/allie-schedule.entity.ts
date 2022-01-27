import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { AllieMenu } from './';

@Entity('AllieSchedule')
export class AllieSchedule {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint')
  allieMenuId: number;

  @Column('timestamptz')
  date: Date;

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

  @ManyToOne(() => AllieMenu, (allieMenu: AllieMenu) => allieMenu.allieSchedules, {})
  @JoinColumn({ name: 'allieMenuId' })
  allieMenu: AllieMenu | null;

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
