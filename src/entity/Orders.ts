import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import OrderDetails from './OrderDetails';
import Customers from './Customers';
import Employees from './Employees';
import Shippers from './Shippers';

@ObjectType()
@Entity('orders', { schema: 'public' })
export default class Orders extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'order_id' })
  orderId: string;

  @Field({ nullable: true })
  @Column('date', { name: 'order_date', nullable: true })
  orderDate: string;

  @Field({ nullable: true })
  @Column('date', { name: 'required_date', nullable: true })
  requiredDate: string;

  @Field({ nullable: true })
  @Column('date', { name: 'shipped_date', nullable: true })
  shippedDate: string;

  @Field({ nullable: true })
  @Column('real', { name: 'freight', nullable: true, precision: 24 })
  freight: number;

  @Field({ nullable: true })
  @Column({
    name: 'ship_name',
    nullable: true,
    length: 40,
  })
  shipName: string;

  @Field({ nullable: true })
  @Column({
    name: 'ship_address',
    nullable: true,
    length: 60,
  })
  shipAddress: string;

  @Field({ nullable: true })
  @Column({
    name: 'ship_city',
    nullable: true,
    length: 15,
  })
  shipCity: string;

  @Field({ nullable: true })
  @Column({
    name: 'ship_region',
    nullable: true,
    length: 15,
  })
  shipRegion: string;

  @Field({ nullable: true })
  @Column({
    name: 'ship_postal_code',
    nullable: true,
    length: 10,
  })
  shipPostalCode: string;

  @Field({ nullable: true })
  @Column({
    name: 'ship_country',
    nullable: true,
    length: 15,
  })
  shipCountry: string;

  @Field(() => OrderDetails)
  @OneToMany(() => OrderDetails, orderDetails => orderDetails.order, {
    eager: true,
  })
  orderDetails: OrderDetails[];

  @Field(() => Customers)
  @ManyToOne(() => Customers, customers => customers.orders, { lazy: true })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'customerId' }])
  customer: Customers;

  @Field(() => Employees)
  @ManyToOne(() => Employees, employees => employees.orders, { lazy: true })
  @JoinColumn([{ name: 'employee_id', referencedColumnName: 'employeeId' }])
  employee: Employees;

  @Field(() => Shippers)
  @ManyToOne(() => Shippers, shippers => shippers.orders, { lazy: true })
  @JoinColumn([{ name: 'ship_via', referencedColumnName: 'shipperId' }])
  shipVia: Shippers;
}
