import fetch from 'isomorphic-fetch';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import withApollo from 'next-with-apollo';
import auth from './auth';

// see https://github.com/lfades/next-with-apollo/issues/13#issuecomment-390289449
export default withApollo(({ ctx, initialState }) => {
  const httpLink = new HttpLink({
    uri: process.env.API_URL,
    fetch
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(err => console.error(`[GraphQL error]: Message: ${err.message}`));
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const contextLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: auth.isLogged(ctx) ? `Bearer ${auth.token(ctx)}` : ''
    }
  }));

  const link = ApolloLink.from([errorLink, contextLink, httpLink]);

  return new ApolloClient({
    link,
    ssrMode: !process.browser,
    cache: new InMemoryCache().restore(initialState || {})
  });
});

if (!process.browser) {
  global.fetch = fetch;
}
