import { Query, Resolver } from 'type-graphql';

import Suppliers from '../entity/Suppliers';

@Resolver()
export default class SuppliersResolver {
  @Query(() => [Suppliers])
  Suppliers() {
    return Suppliers.find();
  }
}
