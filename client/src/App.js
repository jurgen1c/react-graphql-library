import BookList from './components/BookList';
import AddBook from './components/AddBook';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>React GraphQL Library</h1>
        <AddBook />
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
