import { Column, Entity, JoinColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import Orders from './Orders';
import Products from './Products';

@ObjectType({ description: 'Detalhes do pedido' })
@Entity('order_details')
export default class OrderDetails extends BaseEntity {
  @Field()
  @Column('uuid', { name: 'order_id' })
  orderId: string;

  @Field()
  @Column('uuid', { primary: true, name: 'product_id' })
  productId: string;

  @Field()
  @Column('real', { name: 'unit_price', precision: 24 })
  unitPrice: number;

  @Field()
  @Column('smallint', { name: 'quantity' })
  quantity: number;

  @Field()
  @Column('real', { name: 'discount', precision: 24 })
  discount: number;

  @Field(() => Orders)
  @ManyToOne(() => Orders, orders => orders.orderDetails, { lazy: true })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Orders;

  @Field(() => Products)
  @ManyToOne(() => Products, products => products.orderDetails, { lazy: true })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'productId' }])
  product: Products;
}
