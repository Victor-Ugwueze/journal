import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import Joi from '@hapi/joi';
import validationSchema from '../helper/validationSchemas';
import { User } from '../models/types'


interface Context {
  user : {
    id: string,
    email: string
  }
}

class AuthMiddleware {
  static async verifyToken(req: Request) {
    try {
      const token = req.headers.authorization;
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      return {
        user: { ...decoded as {} },
      };
    } catch (error) {
      return { error };
    }
  }

  static isAuthenticated(_, _args: any, { user } : Context) {
    return user ? skip : new ForbiddenError('Not authenticated as user.');
  }

  static async userExist(_, { input: { email } }, { }) {
    try {
      const user = await User.findOne({ where: { email } }) as User;
    return !user
    ? skip
    : ({
      user: null,
      token: null,
      errors: [
        {
          field: 'email',
          message: 'User with this email already exists',
        },
      ],
    });
   } catch (error) {     
    const formatErrors = error.details.map(error => ({
      field: error.context.key,
      message: error.message,
    }));
    return {
      user: null,
      token: null,
      errors: formatErrors,
    };
   }
  }

  static async validateSignUp(_, { input }) {
    try {
      await Joi.valid(
        input,
        validationSchema.validateSignUp(),
        { abortEarly: false },
      );
    } catch (errors) {
      const formatErrors = errors.details.map(error => ({
        field: error.context.key,
        message: error.message,
      }));
      return {
        user: null,
        token: null,
        errors: formatErrors,
      };
    }
    return skip;
  }

  static async validateEntry(_, { input }) {
    try {
      await Joi.valid(
        input,
        input.mode === 'edit'
          ? validationSchema.validateUpdateEntry()
          : validationSchema.validateCreateEntry(),
        { abortEarly: false },
      );
    } catch (errors) {
      const formatErrors = errors.details.map(error => ({
        field: error.context.key,
        message: error.message,
      }));
      console.log(formatErrors);

      return {
        entry: null,
        errors: formatErrors,
      };
    }
    return skip;
  }
}

export default AuthMiddleware;
