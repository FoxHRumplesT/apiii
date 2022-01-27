import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import { User } from './';

@Entity('Suscription')
export class Suscription {
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

  @Column('varchar', {
    length: 255,
    default: 'https://cdn2.salud180.com/sites/default/files/styles/gallerie/public/field/image/2012/12/filete_tomillo_1.-_0.jpg'
  })
  imageUrl: string;

  @Column('numeric', {
    precision: 14,
    scale: 2,
    default: 0
  })
  value: number;

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

  @OneToMany(() => User, (user: User) => user.suscription)
  users: User[];

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
