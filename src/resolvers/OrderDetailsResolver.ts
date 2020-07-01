import { Query, Resolver } from 'type-graphql';

import OrderDetails from '../entity/OrderDetails';

@Resolver()
export default class OrderDetailsResolver {
  @Query(() => [OrderDetails])
  OrderDetails() {
    return OrderDetails.find();
  }
}
