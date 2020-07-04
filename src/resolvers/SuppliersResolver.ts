import { Query, Resolver, InputType, Field, Mutation, Arg } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';

import Suppliers from '../entity/Suppliers';

@InputType()
class SuppliersInput {
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
export default class SuppliersResolver {
  @Query(() => [Suppliers])
  Suppliers() {
    return Suppliers.find();
  }

  @Query(() => Suppliers)
  Supplier(@Arg('supplierId', () => String) supplierId: string) {
    return Suppliers.findOne(supplierId);
  }

  @Mutation(() => Suppliers)
  async createSupplier(
    @Arg('input', () => SuppliersInput) input: SuppliersInput,
  ) {
    const supplierExisting = await Suppliers.findOne({
      where: {
        companyName: input.companyName,
      },
    });

    if (supplierExisting) {
      return new ApolloError('The supplier already exists!', '400');
    }

    return Suppliers.create(input).save();
  }
}
