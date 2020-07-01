import { Query, Resolver } from 'type-graphql';

import Employees from '../entity/Employees';

@Resolver()
export default class EmployeesResolver {
  @Query(() => [Employees])
  Employees() {
    return Employees.find();
  }
}
