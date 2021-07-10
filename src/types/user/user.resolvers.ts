import {ModelCtor, Model} from 'sequelize'
import { combineResolvers } from 'graphql-resolvers';
import { User } from '../../models/types';
import AuthHelper from '../../helper/Auth';
import AuthMiddleWare from '../../middlewares';

const create = async (_, {
  input: {
    email, password, firstName, lastName,
  },
}, { models }: { models: {  [key: string]: ModelCtor<Model<any, any>> }}) => {
  let user;  
  try {
    user = await models.User.create({
      email,
      password: AuthHelper.hashPassword(password),
      firstName,
      lastName,
    });
    if (!user) {
      throw new Error('Problem Creating Your Account');
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
  } catch (error) {    
    throw new Error(error.toString());
  }
};

const login = async (_, { email, password }, { models }: { models: {  [key: string]: ModelCtor<Model<any, any>>}}) => {  
 try {
  
  const user = await models.User.findOne({
    where: { email }
  }) as User;

  if (!user) {
    return {
      user: null,
      token: null,
      errors: [{
        message: 'authentication failed'
      }]
    };
  }

  if (AuthHelper.passwordMatch(password, user.password)) {
    const {
      id,
      email,
      imageUrl,
      firstName,
      lastName,
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
  }
  return {
    user: null,
    token: null,
    errors: [{
      message: 'authentication failed'
    }]
  }; } catch (error) {      
  throw new Error('Server Error');
 }
};

export default {
  Query: {
    me: async() => {
      const user =  User.findAll();

      return 'Hello yes';
    }
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
