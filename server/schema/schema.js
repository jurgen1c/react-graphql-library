const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLBoolean, 
  GraphQLID, 
  GraphQLInt,
  GraphQLList 
} = graphql;

let books = [
  {id: '1', title: 'book1', authorId: 1, genre: 'scary', status: false}, 
  {id: '2', title: 'book2', authorId: 1, genre: 'funny', status: false}, 
  {id: '3', title: 'book3', authorId: 2, genre: 'historic', status: true}, 
]

let authors = [
  {name: 'james', age: 30, id: 1},
  {name: 'jane', age: 20, id: 2},
  {name: 'john', age: 35, id: 3}
]

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return (_.filter(books, {authorId: parent.id}))
      }
    }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return (_.find(authors, {id: parent.authorId}))
      }
    },
    genre: {type: GraphQLString},
    status: {type: GraphQLBoolean},
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLID}},
      resolve(parent, args){
        // code to fetch db
        return (_.find(books, {id: args.id}))
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return (_.find(authors, {id: args.id}))
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});