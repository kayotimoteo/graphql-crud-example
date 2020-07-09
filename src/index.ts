import 'reflect-metadata';
import 'dotenv/config';

import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { altairExpress } from 'altair-express-middleware';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

import createSchema from './utils/createSchema';

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NPM_ENV || 'development',
  );
  await createConnection({ ...options, name: 'default' });

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
    context: ({ req, res }) => ({ req, res }),
    tracing: true,
  });

  app.use(
    '/api/graphql/altair',
    altairExpress({
      endpointURL: '/api/graphql/graphql',
    }),
  );

  app.use(
    '/api/graphql/voyager',
    voyagerMiddleware({ endpointUrl: '/api/graphql/graphql' }),
  );

  apolloServer.applyMiddleware({ path: '/api/graphql/', app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
