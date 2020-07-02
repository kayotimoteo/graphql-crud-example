import { Query, Resolver, Mutation, Arg, InputType, Field } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';

import Customers from '../entity/Customers';

@InputType()
class ConsumerInput {
  @Field(() => String)
  companyName: string;

  @Field(() => String)
  contactName: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  postalCode: string;

  @Field(() => String)
  phone: string;
}

@Resolver()
export default class CustomersResolver {
  @Query(() => [Customers])
  Customers() {
    return Customers.find();
  }

  @Query(() => Customers, { nullable: true })
  Customer(@Arg('customerId', () => String) customerId: string) {
    return Customers.findOne(customerId);
  }

  @Mutation(() => Customers)
  async createConsumer(
    @Arg('input', () => ConsumerInput) input: ConsumerInput,
  ) {
    const consumerExisting = await Customers.findOne({
      where: {
        companyName: input.companyName,
      },
    });

    if (consumerExisting) {
      return new ApolloError('The consumer already exists!', '400');
    }

    return Customers.create(input).save();
  }
}
