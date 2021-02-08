import {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLSchema} from 'graphql';
import loadash from 'loadash';

let books = [
  {id: '1', title: 'book1', author: 'James', genre: 'scary', status: false}, 
  {id: '2', title: 'book2', author: 'James', genre: 'funny', status: false}, 
  {id: '3', title: 'book3', author: 'James', genre: 'historic', status: true}, 
]

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

export const schema = new GraphQLSchema({
  query: RootQuery
})