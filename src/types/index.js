import _ from 'lodash';
import user from './user/user.resolvers';
import entry from './entry/entry.resolver';
import loadTypeSchema from '../helper/schema';


const schemaObject = () => Promise.all(['user', 'entry'].map(loadTypeSchema));

const resolvers = _.merge({}, user, entry);

export {
  schemaObject,
  resolvers,
};
