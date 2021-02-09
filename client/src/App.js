import BookList from './components/BookList';
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
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
