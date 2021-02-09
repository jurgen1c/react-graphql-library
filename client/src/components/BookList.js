import Book from './Book';
import {graphql} from 'react-apollo';
import { getBooks } from '../queries/queries';


const BookList = (props) => {
  const displayBooks = () => {
    let data = props.data;
    if(data.loading){
      return( <div>Loading books...</div> );
    } else {
      return data.books.map(book => {
        return(
          <Book title={book.title} key={book.id} bookID={book.id}/>
        );
      })
    }
  }
  return(
    <div>
      <ul className='bookList'>
        {displayBooks}
      </ul>
    </div>
  )
}

export default graphql(getBooks)(BookList);