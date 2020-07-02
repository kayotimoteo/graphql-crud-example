import {
  Query,
  Resolver,
  Arg,
  Int,
  Field,
  InputType,
  Mutation,
} from 'type-graphql';
import { ApolloError } from 'apollo-server-express';

import Products from '../entity/Products';

@InputType()
class ProductInput {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  productName: string;

  @Field(() => String)
  quantityPerUnit?: string;

  @Field(() => Number)
  unitPrice: number;

  @Field(() => Number)
  unitsInStock: number;

  @Field(() => Number)
  unitsOnOrder: number;
}

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

  @Mutation(() => Products)
  async createProduct(@Arg('input', () => ProductInput) input: ProductInput) {
    const productExisting = await Products.findOne({
      where: {
        productName: input.productName,
      },
    });

    if (!productExisting) {
      return new ApolloError('The product already exists!', '400');
    }

    return Products.create(input).save();
  }
}
