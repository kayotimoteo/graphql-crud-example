import { Query, Resolver } from 'type-graphql';

import Orders from '../entity/Orders';

@Resolver()
export default class ProductResolver {
  @Query(() => [Orders])
  Orders() {
    return Orders.find();
  }
}
