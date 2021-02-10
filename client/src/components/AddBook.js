import {graphql, compose} from 'react-apollo';
import { getAuthors, pushBook, getBooks } from '../queries/queries';
import {useState} from 'react';

const AddBook = (props) => {

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState(false);
  const [auhtorId, setAuthorId] = useState('');
  const [showForm, setShowForm] = useState(false);

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

  const form = styled.form`
    display: ${showForm ? 'flex' : 'none'};
  `

  return (
    <div>
      <button className='book-btn' onClick={() => {showForm ? setShowForm(false) : setShowForm(true)}}>Add Book</button>
      <form id='add-book' onSubmit={formSubmit}>
        <div className="field">
            <label>Book Title:</label>
            <input type="text" onChange={(e) => {setTitle(e.target.value)}}/>
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={(e) => { setGenre(e.target.value)}}/>
        </div>
        <div className="field">
            <label>Status:</label>
            <input type="checkbox" onChange={(e) => {setStatus(e.target.value)}}/>
        </div>
        <div className="field">
            <label>Author:</label>
            <select onSelect={(e) => {setAuthorId(e.target.value)}}>
                <option>Select author</option>
                { displayAuthors }
            </select>
        </div>
        <button type='submit'>+</button>
      </form>
    </div>
  )
}

export default compose(
  graphql(getAuthors, {name: 'getAuthorsQuery'}),
  graphql(pushBook, {name: 'pushBookMutation'})
)(AddBook);