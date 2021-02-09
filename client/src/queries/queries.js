import {gql} from 'apollo-boost';

export const getAuthors = gql`
  {
    authors{
      name
      id
    }
  }
`

export const getBooks = gql`
  {
    books{
      title
      id
    }
  }
`
export const getBook = gql`
  query($id: ID){
    book(id: $id){
      title
      id
      genre
      status
      author{
        name
        age
        books{
          title
          id
        }
      }
    }
  }
`

export const pushBook = gql`
  mutation($title: String!, $genre: String!, $status: Boolean!, $authorId: ID!){
    book(title: $title, genre: $genre, status: $status, authorId: $authorId){
      title
      id
    }
  }
`