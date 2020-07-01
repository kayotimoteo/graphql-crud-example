import { Query, Resolver, Mutation, Arg, InputType, Field } from 'type-graphql';
import { ApolloError } from 'apollo-server-express'

import Categories from '../entity/Categories';

@InputType()
class CategoriesInput{
  @Field(()=> String)
  categoryName: string;

  @Field(()=> String)
  description: string;
}

@Resolver()
export default class CategoriesResolver {
  @Query(() => [Categories])
  async Categories() {
    return await Categories.find();
  }

  @Mutation(()=> Categories)
  async AddCategory(
    @Arg("input", ()=> CategoriesInput) input: CategoriesInput,
  ){
    const categoryExisting = await Categories.findOne({where: {
      categoryName: input.categoryName
    }})

    if(categoryExisting){
      return new ApolloError('The Category already exists!', '400');
    }
    
    return await Categories.create(
      {
        categoryName: input.categoryName, 
        description: input.description
      }).save();
  }
}
