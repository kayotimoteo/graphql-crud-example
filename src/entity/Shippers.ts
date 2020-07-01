import { Column, Entity, OneToMany, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import Orders from './Orders';

@ObjectType()
@Entity('shippers', { schema: 'public' })
export default class Shippers extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid", { name: 'shipper_id' })
  shipperId: string;

  @Field()
  @Column({ name: 'company_name', length: 40 })
  companyName: string;

  @Field({ nullable: true })
  @Column({ name: 'phone', nullable: true, length: 24 })
  phone: string;

  @Field(() => Orders)
  @OneToMany(() => Orders, orders => orders.shipVia, { lazy: true })
  orders: Orders[];
}
