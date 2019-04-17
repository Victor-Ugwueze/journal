import { User } from '../../models';
import AuthHelper from '../../helper/Auth';

const create = async (_, {
  input: {
    email, password, firstName, lastName,
  },
}) => {
  const user = await User.create({
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
    id,
    email,
    imageUrl,
    firstName,
    lastName,
    token,
  };
};

const login = async (_, { email, password }) => {
  const user = await User.findOne({ where: { email } });
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
      id,
      imageUrl,
      firstName,
      lastName,
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
    create,
    login,
  },
};
