import _ from 'lodash';
import user from './user/user.resolvers';
import loadTypeSchema from '../helper/schema';


const schemaObject = () => Promise.all(['user'].map(loadTypeSchema));

const resolvers = _.merge({}, user);

export {
  schemaObject,
  resolvers,
};
