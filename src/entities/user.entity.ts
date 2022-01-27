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
import { Rol, Suscription, City, Order } from './';

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

  @Column('bigint', {
    default: 2
  })
  cityId: number;

  @Column('varchar', {
    length: 255,
    nullable: true
  })
  resetPasswordUuid: string;

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
    length: 100,
    default: '+34'
  })
  indicator: string;

  @Column('varchar', {
    length: 200
  })
  phone: string;

  @Column('varchar', {
    length: 200,
    nullable: true
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

  @ManyToOne(() => Rol, (rol: Rol) => rol.users, {})
  @JoinColumn({ name: 'rolId' })
  rol: Rol | null;

  @ManyToOne(() => Suscription, (suscription: Suscription) => suscription.users, {})
  @JoinColumn({ name: 'suscriptionId' })
  suscription: Suscription | null;

  @ManyToOne(() => City, (city: City) => city.users, {})
  @JoinColumn({ name: 'cityId' })
  city: City | null;

  @OneToMany(() => Order, (order: Order) => order.user)
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
