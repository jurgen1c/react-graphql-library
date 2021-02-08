import express from 'express';
import graphqlHHTP from 'express-graphql';

import {schema } from './schema/schema.js';

const app = express();

app.use(
  '/graphql',
  graphqlHHTP({
    schema
  })
)

app.listen(4000, () => {
  console.log('Now listening on port 4000')
})