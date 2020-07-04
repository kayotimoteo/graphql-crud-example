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

  @Field(() => OrderDetails)
  @OneToMany(() => OrderDetails, orderDetails => orderDetails.order, {
    eager: true,
  })
  orderDetails: OrderDetails[];

  customer_id: string;

  @Field(() => Customers)
  @ManyToOne(() => Customers, customers => customers.orders, { lazy: true })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'customerId' }])
  customer: Customers;

  employee_id: string;

  @Field(() => Employees)
  @ManyToOne(() => Employees, employees => employees.orders, { lazy: true })
  @JoinColumn([{ name: 'employee_id', referencedColumnName: 'employeeId' }])
  employee: Employees;
}
