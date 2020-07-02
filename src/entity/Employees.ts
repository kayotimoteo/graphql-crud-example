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

import Orders from './Orders';

@ObjectType({ description: 'Colaboradores' })
@Entity('employees', { schema: 'public' })
export default class Employees extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'employee_id' })
  employeeId: string;

  @Field()
  @Column({ name: 'name', length: 10 })
  name: string;

  @Field({ nullable: true })
  @Column('date', { name: 'birth_date', nullable: true })
  birthDate: string;

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
  @Column({
    name: 'phone',
    nullable: true,
    length: 24,
  })
  phone: string;

  @ManyToOne(() => Employees, employees => employees.employees, { lazy: true })
  @JoinColumn([{ name: 'reports_to', referencedColumnName: 'employeeId' }])
  reportsTo: Employees;

  @OneToMany(() => Employees, employees => employees.reportsTo, { lazy: true })
  employees: Employees[];

  @Field(() => Orders)
  @OneToMany(() => Orders, orders => orders.employee, { eager: true })
  orders: Orders[];
}
