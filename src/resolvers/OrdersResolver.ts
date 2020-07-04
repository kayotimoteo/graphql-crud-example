import { Query, Resolver, InputType, Field, Arg, Mutation } from 'type-graphql';

import Orders from '../entity/Orders';

@InputType()
class OrdersInput {
  @Field(() => String)
  customer_id: string;

  @Field(() => String)
  employee_id: string;

  @Field(() => String)
  orderDate: string;

  @Field(() => String)
  requiredDate: string;
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

  @Mutation(() => Boolean)
  async removeOrder(@Arg('orderId', () => String) orderId: string) {
    try {
      await Orders.delete(orderId);
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Orders)
  async createOrder(@Arg('input', () => OrdersInput) input: OrdersInput) {
    return Orders.create(input).save();
  }
}
