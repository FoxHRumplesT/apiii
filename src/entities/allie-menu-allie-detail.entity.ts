import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { AllieMenu, AllieDetail } from './';

@Entity('AllieMenuAllieDetail')
export class AllieMenuAllieDetail {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint')
  allieMenuId: number;

  @Column('bigint')
  allieDetailId: number;

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

  @ManyToOne(() => AllieMenu, (allieMenu: AllieMenu) => allieMenu.allieMenuAllieDetails, {})
  @JoinColumn({ name: 'allieMenuId' })
  allieMenu: AllieMenu | null;

  @ManyToOne(() => AllieDetail, (allieDetail: AllieDetail) => allieDetail.allieMenuAllieDetails, {})
  @JoinColumn({ name: 'allieDetailId' })
  allieDetail: AllieDetail | null;

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
