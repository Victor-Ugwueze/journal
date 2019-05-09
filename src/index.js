import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schemaObject, resolvers } from './types';
import models from './models';
import AuthMiddleware from './middlewares';


const app = express();

app.use(cors());
app.use('/graphql', bodyParser.json());

(async () => {
  const schemaTypes = await schemaObject();
  const server = new ApolloServer({
    resolvers,
    typeDefs: schemaTypes,
    context: async ({ req }) => {
      const { user, error } = await AuthMiddleware.verifyToken(req);
      return {
        models,
        user,
        error,
      };
    },
  });
  server.applyMiddleware({ app, path: '/graphql' });
  app.listen({ port: 4000 }, () => console.log('Server running on http://localhost:4000/graphql'));
})();
