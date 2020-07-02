import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import CategoriesResolver from '../resolvers/CategoriesResolver';
import CustomersResolver from '../resolvers/CustomersResolver';
import EmployeesResolver from '../resolvers/EmployeesResolver';
import OrderDetailsResolver from '../resolvers/OrderDetailsResolver';
import OrdersResolver from '../resolvers/OrdersResolver';
import ProductsResolver from '../resolvers/ProductsResolver';
import SuppliersResolver from '../resolvers/SuppliersResolver';

const createSchema = () =>
  buildSchema({
    container: Container,
    resolvers: [
      CategoriesResolver,
      CustomersResolver,
      EmployeesResolver,
      OrderDetailsResolver,
      OrdersResolver,
      ProductsResolver,
      SuppliersResolver,
    ],
  });

export default createSchema;
