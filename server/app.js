const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const uri = "mongodb+srv://JCG:Jurgen.mongo.1988@library.2w4p3.mongodb.net/graphql-library?retryWrites=true&w=majority";
          //'mongodb+srv://JCG:Jurgen.mongo.1988@library.2txzy.mongodb.net/graphql-library?retryWrites=true&w=majority', 
//179.50.249.148/32
const mogoose = require('mongoose');
try{
  mogoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  mogoose.connection.once('open', () => {
    console.log('connection success')
  }) 

}catch(err){
  console.log(err)
}
const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Now listening on port 4000')
})