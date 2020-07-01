import { Query, Resolver } from 'type-graphql';

import Shippers from '../entity/Shippers';

@Resolver()
export default class ShippersResolver {
  @Query(() => [Shippers])
  Shippers() {
    return Shippers.find();
  }
}
