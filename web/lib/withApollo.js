import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import auth from './auth';

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: 'http://localhost:4000/',
      cache: new InMemoryCache().restore(initialState || {}),
      request: operation =>
        operation.setContext({
          headers: {
            ...headers,
            Authorization: auth.isLogged(ctx) ? `Bearer ${auth.token(ctx)}` : ''
          }
        })
    })
);
