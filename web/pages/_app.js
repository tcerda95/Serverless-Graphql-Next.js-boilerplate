import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import withApolloClient from '../lib/with-apollo-client';
import theme from '../lib/theme';
import globalStyles from '../lib/globalStyles';

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp);
