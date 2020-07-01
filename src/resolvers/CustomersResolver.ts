import { Query, Resolver, Mutation, Arg, InputType, Field } from 'type-graphql';

import Customers from '../entity/Customers';
import { ApolloError } from 'apollo-server-express';

@InputType()
class ConsumerInput {
  @Field(()=> String)
  categoryName: string;

  @Field(()=> String)
  description: string;

  @Field(()=> String)
  companyName: string;

  @Field(()=> String)
  contactName: string;

  @Field(()=> String)
  contactTitle: string;

  @Field(()=> String)
  address: string;

  @Field(()=> String)
  city: string;

  @Field(()=> String)
  region: string;

  @Field(()=> String)
  postalCode: string;

  @Field(()=> String)
  country: string;

  @Field(()=> String)
  phone: string;

  @Field(()=> String)
  fax: string;
}

@Resolver()
export default class CustomersResolver {
  @Query(() => [Customers])
  Customers() {
    return Customers.find();
  }

  @Mutation(()=> Customers)
  async AddConsumer(
    @Arg("input", ()=> ConsumerInput) input : ConsumerInput,
  ){
    const consumerExisting = await Customers.findOne({where: {
      companyName: input.companyName
    }})

    if(consumerExisting){
      return new ApolloError('The Consumer already exists!', '400');
    }
    
    return await Customers.create(input).save();
  }
}
