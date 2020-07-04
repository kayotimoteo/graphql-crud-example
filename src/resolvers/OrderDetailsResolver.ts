import { Query, Resolver, InputType, Field, Arg, Mutation } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';

import OrderDetails from '../entity/OrderDetails';
import Orders from '../entity/Orders';

@InputType()
class OrderDetailsInput {
  @Field(() => String)
  orderId: string;

  @Field(() => String)
  productId: string;

  @Field(() => Number)
  unitPrice: number;

  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  discount: number;
}

@Resolver()
export default class OrderDetailsResolver {
  @Query(() => [OrderDetails])
  OrderDetailsAll() {
    return OrderDetails.find();
  }

  @Query(() => [OrderDetails], { nullable: true })
  OrderDetails(@Arg('orderId', () => String) orderId: string) {
    return OrderDetails.find({ where: { orderId } });
  }

  @Mutation(() => Boolean)
  async removeOrderDetails(@Arg('orderId', () => String) orderId: string) {
    try {
      await OrderDetails.delete(orderId);
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => OrderDetails)
  async createOrderDetails(
    @Arg('input', () => OrderDetailsInput) input: OrderDetailsInput,
  ) {
    const consumerExisting = await Orders.findOne({
      where: {
        orderId: input.orderId,
      },
    });

    if (!consumerExisting) {
      return new ApolloError('This order does not exist', '400');
    }

    return OrderDetails.create(input).save();
  }
}
