import { Query, Resolver, Arg, Field, InputType, Mutation } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';

import Products from '../entity/Products';

@InputType()
class ProductInput {
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

  @Field()
  discontinued: boolean;

  @Field(() => String)
  category_id: string;

  @Field(() => String)
  supplier_id: string;
}

@Resolver()
export default class ProductResolver {
  @Query(() => [Products])
  Products() {
    return Products.find();
  }

  @Query(() => Products, { nullable: true })
  Product(@Arg('productId', () => String) productId: string) {
    return Products.findOne(productId);
  }

  @Mutation(() => Products)
  async createProduct(@Arg('input', () => ProductInput) input: ProductInput) {
    const productExisting = await Products.findOne({
      where: {
        productName: input.productName,
      },
    });

    if (productExisting) {
      return new ApolloError('The product already exists!', '400');
    }

    return Products.create(input).save();
  }
}
