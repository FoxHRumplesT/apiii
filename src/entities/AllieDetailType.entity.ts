import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import { AllieDetail } from './allieDetail.entity';

@Entity('AllieDetailType')
export class AllieDetailType {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('varchar', {
    length: 200
  })
  name: string;

  @Column('varchar', {
    length: 200
  })
  description: string;

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

  @OneToMany(() => AllieDetail, (allieDetail: AllieDetail) => allieDetail.allieDetailType)
  allieDetails: AllieDetail[];

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
