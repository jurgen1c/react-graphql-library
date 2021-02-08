import {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLSchema} from 'graphql';
import loadash from 'loadash';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    author: {type: GraphQLString},
    genre: {type: GraphQLString},
    status: {type: GraphQLBoolean}
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLString}},
      resolve(parent, args){
        // code to fetch db
        return (loadash.find(books, {id: args.id}))
      }
    }
  }
})