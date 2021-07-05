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

const listAllEntries = async (_, { id }, { models, user: { userId } }) => {
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


const updateEntry = async (_, { input }, { models, user }) => {
  try {
    const foundEntry = await models.Entry.findOne({ where: { id: input.id, userId: user.userId } });
    if (!foundEntry) {
      return new Error('Entry not found');
    }

    const { title, body } = foundEntry;
    const entry = await models.Entry.update({ title, body, ...input }, {
      where: {
        id: input.id,
      },
      returning: {
        plain: true,
      },
    });
    return {
      errors: [],
      entry: {
        ...entry[1][0].dataValues,
      },
    };
  } catch (error) {
    throw new Error('An Error ocurred while updating entry');
  }
};

const deleteEntry = async (_, { id }, { models, user }) => {
  try {
    const foundEntry = await models.Entry.findOne({ where: { id, userId: user.userId } });
    if (!foundEntry) {
      return new Error('Entry not found');
    }
    await models.Entry.destroy({
      where: {
        id,
      },
    });
    return {
      errors: [],
      message: 'Entry deleted successfully',
    };
  } catch (error) {
    throw new Error('An Error ocurred deleting entry');
  }
};

const genEntryById = async (_, { id }, { models, user }) => {
  try {
    const entry = await models.Entry.findOne({ where: { id, userId: user.userId } });
    return entry;
  } catch (error) {
    throw new Error('An Error ocurred fetching entry');
  }
};

export default {
  Query: {
    listAllEntries: combineResolvers(
      AuthMiddleWare.isAuthenticated,
      // listAllEntries
    ),
  },
  Mutation: {
    createEntry: combineResolvers(
      AuthMiddleWare.isAuthenticated,
      AuthMiddleWare.validateEntry,
      createEntry,
    ),
    updateEntry: combineResolvers(
      AuthMiddleWare.isAuthenticated,
      AuthMiddleWare.validateEntry,
      updateEntry,
    ),
    deleteEntry: combineResolvers(
      AuthMiddleWare.isAuthenticated,
      deleteEntry,
    ),
    genEntryById: combineResolvers(
      AuthMiddleWare.isAuthenticated,
      genEntryById,
    ),
  },
};
