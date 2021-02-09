import {graphql} from 'react-apollo';
import { getBook } from '../queries/queries';

const Book = ({title, genre, status, auhtorId }) => {
  return (
    <div className='book-cont'>
      <h3>Book Title</h3>
    </div>
  )
}

export default graphql(getBook, {
  options: (props) => {
    return {
      variables: {id: props.bookId}
    }
  }
})(Book);