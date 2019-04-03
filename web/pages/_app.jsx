import React from 'react';
import App, { Container } from 'next/app';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import { ApolloProvider } from 'react-apollo';
import globalStyles from '../lib/globalStyles';
import theme from '../lib/theme';
import withApollo from '../lib/withApollo';
import { withUserApp, UserProvider } from '../lib/auth';

class MyApp extends App {
  render() {
    const { Component, pageProps, user, apollo } = this.props;

    return (
      <Container>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apollo}>
            <UserProvider user={user}>
              <Component {...pageProps} />
            </UserProvider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withUserApp(withApollo(MyApp));
