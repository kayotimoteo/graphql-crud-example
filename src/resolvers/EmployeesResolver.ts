import { Query, Resolver, InputType, Field, Mutation, Arg } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';

import Employees from '../entity/Employees';

@InputType()
class EmployessInput {
  @Field(() => String)
  employeeId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  birthDate: string;

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
export default class EmployeesResolver {
  @Query(() => [Employees])
  Employees() {
    return Employees.find();
  }

  @Query(() => Employees, { nullable: true })
  Employee(@Arg('order_id', () => String) order_id: string) {
    return Employees.findOne(order_id);
  }

  @Mutation(() => Employees)
  async createEmployee(
    @Arg('input', () => EmployessInput) input: EmployessInput,
  ) {
    const consumerExisting = await Employees.findOne({
      where: {
        companyName: input.name,
      },
    });

    if (consumerExisting) {
      return new ApolloError('The employee already exists!', '400');
    }

    return Employees.create(input).save();
  }
}
