import { Query, Resolver, InputType, Field, Arg, Mutation } from 'type-graphql';

import Orders from '../entity/Orders';

@InputType()
class OrdersInput {
  @Field(() => String)
  orderDate: string;

  @Field(() => String)
  requiredDate: string;

  @Field(() => String)
  shippedDate: string;
}

@Resolver()
export default class ProductResolver {
  @Query(() => [Orders])
  Orders() {
    return Orders.find();
  }

  @Query(() => [Orders], { nullable: true })
  Order(@Arg('orderId', () => String) orderId: string) {
    return Orders.find({ where: { orderId } });
  }

  @Mutation(() => Orders)
  async createOrder(@Arg('input', () => OrdersInput) input: OrdersInput) {
    return Orders.create(input).save();
  }
}
