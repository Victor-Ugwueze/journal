import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { schemaObject, resolvers } from './types';

const app = express();

app.use(cors());
app.use('/graphql', bodyParser.json());

(async () => {
  const schemaTypes = await schemaObject();
  const server = new ApolloServer({
    resolvers,
    typeDefs: schemaTypes,
  });
  server.applyMiddleware({ app, path: '/graphql' });

  app.post('/api/v1/auth/signup', (req, res) => {
    res.status(201).json({
      status: 201,
      data: {
        username: 'Andela Man',
        token: 'dvwdvshsavchjasd.cewfewio wskNAXJWEBAFSCAEW.Caewsvcwbevsfbcawjesbfjcbwejsdbzc'
      },
    });
  });
  app.listen({ port: 4000 }, () => console.log('Server running on http://localhost:4000/graphql'));
})();
