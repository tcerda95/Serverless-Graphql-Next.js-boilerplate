// Polyfill fetch
import 'isomorphic-fetch';

let apolloClient;

const ssrMode = !process.browser;

export default function initApollo(clientFn, options) {
  if (!clientFn) {
    throw new Error(
      '[withApollo] the first param is missing and is required to get the ApolloClient'
    );
  }

  if (ssrMode) {
    return getClient(clientFn, options);
  }

  if (!apolloClient) {
    apolloClient = getClient(clientFn, options);
  }

  return apolloClient;
}

function getClient(clientFn, options = {}) {
  if (typeof clientFn !== 'function') {
    throw new Error('[withApollo] requires a function that returns an ApolloClient');
  }

  const client = clientFn(options);

  if (options.initialState) {
    client.cache.restore(options.initialState);
  }

  return client;
}
