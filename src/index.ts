const express = require('express');
import { ApolloServer } from 'apollo-server-express';
const cors = require('cors');
const bodyParser = require('body-parser');
import { schemaObject, resolvers } from './types';
import { sequelize } from './models';
import AuthMiddleware from './middlewares';
import {ModelCtor, Model} from 'sequelize'

// (async function(){
//   try {
//     const sq = new Bd('postgres://gozman:password@db:5432/journal')
//     await sq.authenticate()
//     sq.query("SELECT * FROM users").then(u => console.log(u));
//   } catch (error) {
//     console.log(error);
//   }
// })()


const app = express();

async function done() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Heloo')
    }, 0)
  })
}

app.use(cors());
app.use('/graphql', bodyParser.json());
app.get('/', async(req, res) => {
  await sequelize.models.User.findAll().then(e => console.log(e, 'all'))
  const ans = await done()
  console.log(ans);
  
  res.status(200).json({ message: 'Welcome ', ans })
});

(async () => {
  const schemaTypes = await schemaObject();
  const server = new ApolloServer({
    resolvers,
    typeDefs: schemaTypes,
    context: async ({ req }): Promise<{  user: { id: number }, models: {  [key: string]: ModelCtor<Model<any, any>> }, error: any }> => {
      const { user, error } = await AuthMiddleware.verifyToken(req) as { user: { id: number }, error: any };      
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
