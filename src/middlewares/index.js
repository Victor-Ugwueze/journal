import jwt from 'jsonwebtoken';
import { skip } from 'graphql-resolvers';
import { ForbiddenError } from 'apollo-server';
import Joi from '@hapi/joi';
import validationSchema from '../helper/validationSchemas';


class AuthMiddleware {
  static async verifyToken(req) {
    try {
      const token = req.headers.authorization;
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      return {
        user: { ...decoded },
      };
    } catch (error) {
      return { error };
    }
  }

  static isAuthenticated(parent, args, { user }) {
    return user ? skip : new ForbiddenError('Not authenticated as user.');
  }

  static async userExist(_, { input: { email } }, { models: { User } }) {
    const user = await User.findOne({ where: { email } });
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
  }

  static async validateSignUp(_, { input }) {
    try {
      await Joi.validate(
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
      await Joi.validate(
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
