import { combineResolvers } from 'graphql-resolvers';
import { User } from '../../models/types';
import AuthHelper from '../../helper/Auth';
import AuthMiddleWare from '../../middlewares';

const create = async (_, {
  input: {
    email, password, firstName, lastName,
  },
}) => {
  let user;
  try {
    user = await User.create({
      email,
      password: AuthHelper.hashPassword(password),
      firstName,
      lastName,
    });
    if (!user) {
      throw new Error('Problem Creating Your Account');
    }
  } catch (error) {
    throw new Error(error.toString());
  }
  const {
    id,
    imageUrl,
  } = user;

  const token = AuthHelper.generateToken(id, email);
  return {
    user: {
      id,
      email,
      imageUrl,
      firstName,
      lastName,
    },
    token,
  };
};

const login = async (_, { email, password }) => {
  const user = await User.findOne({ where: { email } }) as User;
  if (!user) {
    throw new Error('User not Found');
  }

  if (AuthHelper.passwordMatch(password, user.password)) {
    const {
      id,
      imageUrl,
      firstName,
      lastName,
    } = user;
    const token = AuthHelper.generateToken(id, email);
    return {
      user: {
        id,
        imageUrl,
        firstName,
        lastName,
      },
      token,
    };
  }
  throw new Error('Unauthorized');
};

export default {
  Query: {
    me: () => 'Hello',
  },
  Mutation: {
    create: combineResolvers(
      AuthMiddleWare.userExist,
      AuthMiddleWare.validateSignUp,
      create,
    ),
    login,
  },
};
