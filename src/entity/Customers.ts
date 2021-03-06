import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import Orders from './Orders';

@ObjectType({ description: 'Clientes' })
@Entity('customers')
export default class Customers extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'customer_id' })
  customerId: string;

  @Field()
  @Column({ name: 'company_name', length: 40 })
  companyName: string;

  @Field({ nullable: true })
  @Column({
    name: 'contact_name',
    nullable: true,
    length: 30,
  })
  contactName: string;

  @Field({ nullable: true })
  @Column({ name: 'address', nullable: true, length: 60 })
  address: string;

  @Field({ nullable: true })
  @Column({ name: 'city', nullable: true, length: 15 })
  city: string;

  @Field({ nullable: true })
  @Column({
    name: 'postal_code',
    nullable: true,
    length: 10,
  })
  postalCode: string;

  @Field({ nullable: true })
  @Column({ name: 'phone', nullable: true, length: 24 })
  phone: string;

  @Field(() => Orders)
  @OneToMany(() => Orders, orders => orders.customer, { eager: true })
  orders: Orders[];
}
