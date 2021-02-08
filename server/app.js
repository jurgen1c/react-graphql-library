import express from 'express';
import graphqlHHTP from 'express-graphql';

const app = express();

app.listen(4000, () => {
  console.log('Now listening on port 4000')
})