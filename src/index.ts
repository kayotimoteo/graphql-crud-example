import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { altairExpress } from 'altair-express-middleware';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

import createSchema from './utils/createSchema';

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || 'development',
  );
  await createConnection({ ...options, name: 'default' });

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    tracing: true,
  });

  app.use(
    '/altair',
    altairExpress({
      endpointURL: '/graphql',
    }),
  );

  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
