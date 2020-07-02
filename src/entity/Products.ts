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
import Categories from './Categories';
import Suppliers from './Suppliers';

@ObjectType()
@Entity('products', { schema: 'public' })
class Products extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'product_id' })
  productId: string;

  @Field({ nullable: true })
  @Column({ name: 'product_name', length: 40 })
  productName: string;

  @Field({ nullable: true })
  @Column({
    name: 'quantity_per_unit',
    nullable: true,
    length: 20,
  })
  quantityPerUnit?: string;

  @Field({ nullable: true })
  @Column('real', { name: 'unit_price', nullable: true, precision: 24 })
  unitPrice: number;

  @Field({ nullable: true })
  @Column('smallint', { name: 'units_in_stock', nullable: true })
  unitsInStock: number;

  @Field({ nullable: true })
  @Column('smallint', { name: 'units_on_order', nullable: true })
  unitsOnOrder: number;

  @Field()
  @Column('integer', { name: 'discontinued' })
  discontinued: number;

  @Field(() => OrderDetails)
  @OneToMany(() => OrderDetails, orderDetails => orderDetails.product, {
    lazy: true,
  })
  orderDetails: OrderDetails[];

  @Column()
  category_id: number;

  @ManyToOne(() => Categories, categories => categories.products, {
    lazy: true,
  })
  @JoinColumn({ name: 'category_id' })
  @Field(() => Categories)
  category: Categories;

  @ManyToOne(() => Suppliers, suppliers => suppliers.products, { lazy: true })
  @JoinColumn([{ name: 'supplier_id', referencedColumnName: 'supplierId' }])
  supplier: Suppliers;
}

export default Products;
