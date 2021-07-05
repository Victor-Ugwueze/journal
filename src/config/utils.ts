
const generalOptionalEnvVariables = [
  'DATABASE_DIALECT',
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_PASSWORD',
];

const optionalEnvVariables = {
  development: generalOptionalEnvVariables,
  staging: generalOptionalEnvVariables,
  test: generalOptionalEnvVariables,
  production: generalOptionalEnvVariables,
};

if (process.env.NODE_ENV === undefined) {
  throw new Error(`
  \n:
  'you don't have .env file or NODE_ENV is not provided '\n'
  \n
  `);
}

module.exports = (requiredVariables) => {
  const undefinedVariables = Object.keys(requiredVariables)
    .filter(variable => requiredVariables[variable] === undefined
    && !optionalEnvVariables[process.env.NODE_ENV].includes(requiredVariables));

  if (!undefinedVariables.length) return requiredVariables;

  /* istanbul ignore next */
  throw new Error(`
    \nThe following variables are required and missing in .env:
    \n${undefinedVariables.join('\n')}
    \n
    `);
};
