import fs from 'fs';
import path from 'path';

// const loadTypeSchema = type => new Promise((resolve, reject) => {
//   const pathToSchema = path.join(
//     process.cwd(),
//     `src/types/${type}/${type}.gql`,
//   );
//   fs.readFile(pathToSchema, { encoding: 'utf-8' }, (err, schema) => {
//     if (err) {
//       return reject(err);
//     }

//     resolve(schema);
//   });
// });

async function loadTypeSchema(type) {
  const pathToSchema = path.join(
    process.cwd(),
    `src/types/${type}/${type}.gql`,
  );
  try {
    const schema = await fs.readFileSync(pathToSchema, { encoding: 'utf-8' });
    return schema;
  } catch (err) { return err; }
}

export default loadTypeSchema;
