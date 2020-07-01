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

@ObjectType( {description:"Funcionarios"} )
@Entity('employees', { schema: 'public' })
export default class Employees extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid", { name: 'employee_id' })
  employeeId: string;

  @Field()
  @Column(   { name: 'last_name', length: 20 })
  lastName: string;

  @Field()
  @Column(   { name: 'first_name', length: 10 })
  firstName: string;

  @Field({ nullable: true })
  @Column(   { name: 'title', nullable: true, length: 30 })
  title: string;

  @Field({ nullable: true })
  @Column(   {
    name: 'title_of_courtesy',
    nullable: true,
    length: 25,
  })
  titleOfCourtesy: string;

  @Field({ nullable: true })
  @Column('date', { name: 'birth_date', nullable: true })
  birthDate: string;

  @Field({ nullable: true })
  @Column('date', { name: 'hire_date', nullable: true })
  hireDate: string;

  @Field({ nullable: true })
  @Column(   { name: 'address', nullable: true, length: 60 })
  address: string;

  @Field({ nullable: true })
  @Column(   { name: 'city', nullable: true, length: 15 })
  city: string;

  @Field({ nullable: true })
  @Column(   { name: 'region', nullable: true, length: 15 })
  region: string;

  @Field({ nullable: true })
  @Column(   {
    name: 'postal_code',
    nullable: true,
    length: 10,
  })
  postalCode: string;

  @Field({ nullable: true })
  @Column(   { name: 'country', nullable: true, length: 15 })
  country: string;

  @Field({ nullable: true })
  @Column(   {
    name: 'home_phone',
    nullable: true,
    length: 24,
  })
  homePhone: string;

  @Field({ nullable: true })
  @Column(   { name: 'extension', nullable: true, length: 4 })
  extension: string;

  @Field({ nullable: true })
  @Column('text', { name: 'photo', nullable: true })
  photo: string;

  @Field({ nullable: true })
  @Column('text', { name: 'notes', nullable: true })
  notes: string;

  @Field({ nullable: true })
  @Column(   {
    name: 'photo_path',
    nullable: true,
    length: 255,
  })
  photoPath: string;

  @ManyToOne(() => Employees, employees => employees.employees, { lazy: true })
  @JoinColumn([{ name: 'reports_to', referencedColumnName: 'employeeId' }])
  reportsTo: Employees;

  @OneToMany(() => Employees, employees => employees.reportsTo, { lazy: true })
  employees: Employees[];

  @Field(() => Orders)
  @OneToMany(() => Orders, orders => orders.employee, { eager: true })
  orders: Orders[];
}
