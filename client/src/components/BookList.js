import Book from './Book';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooks = gql`
  {
    books{
      title
      id
    }
  }
`

const BookList = () => {
  return(
    <div>
      <ul className='bookList'>
        <Book/>
      </ul>
    </div>
  )
}

export default graphql(getBooks)(BookList);