import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const typeDefs = gql`
  type Query{
    me: User
  }
  type User {
    username: String
  }
`;

const resolvers = {
  Query: {
    me: () => ({
      username: 'Victor',
    }),
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 4000 }, () => console.log('Server running on http://localhost:4000/graphql'));
