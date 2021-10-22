import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column('bigint')
  rolId: number;

  @Column('bigint')
  suscriptionId: number;

  @Column('bigint')
  cityId: number;

  @Column('varchar', {
    length: 200
  })
  name: string;

  @Column('varchar', {
    length: 200,
    nullable: true
  })
  lastName: string;

  @Column('varchar', {
    length: 200
  })
  email: string;

  @Column('varchar', {
    length: 200
  })
  password: string;

  @Column('varchar', {
    length: 200
  })
  phone: string;

  @Column('varchar', {
    length: 200,
    default: 'M'
  })
  gender: string;

  @Column('varchar', {
    length: 200,
    nullable: true
  })
  latitude: string;

  @Column('varchar', {
    length: 200,
    nullable: true
  })
  longitude: string;

  @Column('varchar', {
    length: 200,
    nullable: true
  })
  ocupation: string;

  @Column('timestamptz', {
    nullable: true
  })
  birthdayAt: Date;

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
