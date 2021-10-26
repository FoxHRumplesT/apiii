import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import { Allie } from './';

@Entity('AllieType')
export class AllieType {
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

  @OneToMany(() => Allie, (allie: Allie) => allie.allieType)
  allies: Allie[];

  @BeforeUpdate()
  beforeUpdate() {
    console.log('Hola mundo');

    this.updatedAt = new Date();
  }

  @BeforeInsert()
  beforeSave() {
    console.log('Hola mundo');
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
