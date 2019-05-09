import { combineResolvers } from 'graphql-resolvers';
import AuthMiddleWare from '../../middlewares';


const createEntry = async (
  _,
  {
    input: {
      title,
      body,
    },
  },
  {
    models: {
      Entry,
    },
    user,
    error,
  },
) => {
  if (error) {
    throw new Error(error.message);
  }
  const { id } = await Entry.create({
    title,
    body,
    userId: user.userId,
  });
  return {
    entry: {
      id,
      title,
      body,
    },
    errors: [],
  };
};

export default {
  Mutation: {
    createEntry: combineResolvers(
      AuthMiddleWare.isAuthenticated,
      AuthMiddleWare.validateCreateEntry,
      createEntry,
    ),
  },
};
