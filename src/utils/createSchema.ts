import { buildSchema } from "type-graphql";
import CategoriesResolver from '../resolvers/CategoriesResolver';
import CustomersResolver from '../resolvers/CustomersResolver';
import EmployeesResolver from '../resolvers/EmployeesResolver';
import OrderDetailsResolver from '../resolvers/OrderDetailsResolver';
import OrdersResolver from '../resolvers/OrdersResolver';
import ProductsResolver from '../resolvers/ProductsResolver';
import ShippersResolver from '../resolvers/ShippersResolver';
import SuppliersResolver from '../resolvers/SuppliersResolver';
import { Container } from "typedi";

export const createSchema = () =>
  buildSchema({
    container: Container,
    resolvers: [
      CategoriesResolver,
      CustomersResolver,
      EmployeesResolver,
      OrderDetailsResolver,
      OrdersResolver,
      ProductsResolver,
      ShippersResolver,
      SuppliersResolver,
    ],
  });