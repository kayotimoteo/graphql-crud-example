import { Query, Resolver, Arg, Int } from 'type-graphql';

import Products from '../entity/Products';

@Resolver()
export default class ProductResolver {
  @Query(() => [Products])
  Products() {
    return Products.find();
  }

  @Query(() => Products, { nullable: true })
  Product(@Arg('productId', () => Int) productId: number) {
    return Products.findOne(productId);
  }
}
