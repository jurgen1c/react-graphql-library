import {graphql, compose} from 'react-apollo';
import { getAuthors, pushBook, getBooks } from '../queries/queries';
import {useState} from 'react';

const AddBook = (props) => {

  const [title, setTitle] = useState('');
  const [grenre, setGenre] = useState('');
  const [status, setStatus] = useState(false);
  const [auhtorId, setAuthorId] = useState('');

  const displayAuthors = () => {
    let data = props.getAuthorsQuery;
    if(data.loading){
      return (<option disabled>Loading Authors...</option>)
    }else {
      return ( data.authors.map(author =>{
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      }))
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    props.pushBookMutation({
      variables: {
        title: title,
        genre: genre,
        status: status,
        authorId: auhtorId
      },
      refetchQueries: [{query: {getBooks}}]
    });

  }

  return (
    <form id='add-book' onSubmit={formSubmit}>
      <div className="field">
          <label>Book Title:</label>
          <input type="text" onChange={(e) => {setTitle(e.target.value)}}/>
      </div>
      <div className="field">
          <label>Genre:</label>
          <input type="text" />
      </div>
      <div className="field">
          <label>Author:</label>
          <select>
              <option>Select author</option>
              { displayAuthors }
          </select>
      </div>
      <button>+</button>
    </form>
  )
}

export default compose(
  graphql(getAuthors, {name: 'getAuthorsQuery'}),
  graphql(pushBook, {name: 'pushBookMutation'})
)(AddBook);