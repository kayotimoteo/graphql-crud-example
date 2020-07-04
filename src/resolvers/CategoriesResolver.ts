import { Query, Resolver, Mutation, Arg, InputType, Field } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';

import Categories from '../entity/Categories';

@InputType()
class CategoriesInput {
  @Field(() => String)
  categoryName: string;

  @Field(() => String)
  description: string;
}

@Resolver()
export default class CategoriesResolver {
  @Query(() => [Categories])
  async Categories() {
    return Categories.find();
  }

  @Query(() => Categories, { nullable: true })
  async Category(@Arg('categoryId', () => String) categoryId: string) {
    return Categories.findOne(categoryId);
  }

  @Mutation(() => Categories)
  async createCategory(
    @Arg('input', () => CategoriesInput) input: CategoriesInput,
  ) {
    const categoryExisting = await Categories.findOne({
      where: {
        categoryName: input.categoryName,
      },
    });

    if (categoryExisting) {
      return new ApolloError('The category already exists!', '400');
    }

    return Categories.create(input).save();
  }
}
