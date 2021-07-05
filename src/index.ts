const express = require('express');
import { ApolloServer } from 'apollo-server-express';
const cors = require('cors');
const bodyParser = require('body-parser');
import { schemaObject, resolvers } from './types';
import { sequelize } from './models';
import AuthMiddleware from './middlewares';


const app = express();

app.use(cors());
app.use('/graphql', bodyParser.json());
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome ' }));

(async () => {
  const schemaTypes = await schemaObject();
  const server = new ApolloServer({
    resolvers,
    typeDefs: schemaTypes,
    context: async ({ req }) => {
      const { user, error } = await AuthMiddleware.verifyToken(req);
      return {
        models: sequelize.models,
        user,
        error,
      };
    },
  });
  server.applyMiddleware({ app, path: '/graphql' });
  app.listen({ port: process.env.PORT || 4000 }, () => console.log('Server running on http://localhost:4000/graphql'));
})();
