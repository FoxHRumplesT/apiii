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
import { AllieDetail } from './allieDetail.entity';
import { Allie } from './allie.entity';

@Entity('AllieStep')
export class AllieStep {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint')
  allieId: number;

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

  @ManyToOne(() => Allie, (allie: Allie) => allie.allieSteps, {})
  @JoinColumn({ name: 'allieId' })
  allie: Allie | null;

  @OneToMany(() => AllieDetail, (allieDetail: AllieDetail) => allieDetail.allieStep)
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
