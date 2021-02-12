import Joi from '@hapi/joi';

const schema = {
  validateSignUp: () => Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30)
      .required(),
    lastName: Joi.string().alphanum().min(3).max(30)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
      .options({
        language: {
          string: {
            regex: {
              base: 'must have at least one lowercase, uppercase, a digit, and a special character',
            },
          },
        },
      }),
  }),

  validateCreateEntry: () => Joi.object().keys({
    title: Joi.string().min(3).max(60)
      .required(),
    body: Joi.string().min(3).required(),
  }),


  validateUpdateEntry: () => Joi.object().keys({
    title: Joi.string().min(3).max(60),
    body: Joi.string().min(3),
    mode: Joi.string().valid('edit').required(),
    id: Joi.string().required(),
  }),
};

export default schema;
