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
import { Allie, AllieSchedule, AllieMenuAllieDetail } from './';

@Entity('AllieMenu')
export class AllieMenu {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint')
  allieId: number;

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

  @ManyToOne(() => Allie, (allie: Allie) => allie.allieMenus, {})
  @JoinColumn({ name: 'allieId' })
  allie: Allie | null;

  @OneToMany(() => AllieSchedule, (allieSchedule: AllieSchedule) => allieSchedule.allieMenu)
  allieSchedules: AllieSchedule[];

  @OneToMany(() => AllieMenuAllieDetail, (allieMenuAllieDetail: AllieMenuAllieDetail) => allieMenuAllieDetail.allieMenu)
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
