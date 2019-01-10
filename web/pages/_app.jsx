import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/withApollo';
import GlobalStyle from '../lib/GlobalStyle';
import { withUserApp, UserProvider } from '../lib/auth';

class MyApp extends App {
  render() {
    const { Component, pageProps, user, apollo } = this.props;

    return (
      <Container>
        <GlobalStyle />
        <ApolloProvider client={apollo}>
          <UserProvider user={user}>
            <Component {...pageProps} />
          </UserProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withUserApp(withApollo(MyApp));
