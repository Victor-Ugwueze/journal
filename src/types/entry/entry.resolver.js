import { combineResolvers } from 'graphql-resolvers';
import AuthMiddleWare from '../../middlewares';


const createEntry = async (_, { input }, { models, user, error }) => {
  const { title, body } = input;
  if (error) {
    throw new Error(error.message);
  }

  const { id, createdAt, updatedAt } = await models.Entry.create({
    title,
    body,
    userId: user.userId,
  });

  return {
    entry: {
      id,
      title,
      body,
      createdAt,
      updatedAt,
    },
    errors: [],
  };
};

const listAllEntry = async (_, args, { models, user: { userId } }) => {
  try {
    const entries = await models.Entry.findAll({
      where: {
        userId,
      },
    });
    return entries;
  } catch (error) {
    throw new Error('An Error ocurred while fetching entries');
  }
};

export default {
  Query: {
    listAllEntry: combineResolvers(
      AuthMiddleWare.isAuthenticated,
      listAllEntry,
    ),
  },
  Mutation: {
    createEntry: combineResolvers(
      AuthMiddleWare.isAuthenticated,
      AuthMiddleWare.validateCreateEntry,
      createEntry,
    ),
  },
};
