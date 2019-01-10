import Head from 'next/head';
import React from 'react';
import { getDataFromTree } from 'react-apollo';
import initApollo from './debugInitApollo';

const ssrMode = !process.browser;

// Gets the display name of a JSX component for dev tools
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

export default function withApollo(client, options = {}) {
  if (!options.getDataFromTree) {
    options.getDataFromTree = 'always';
  }

  return App =>
    class WithApollo extends React.Component {
      static displayName = `WithApollo(${getDisplayName(App)})`;

      static getInitialProps = async appCtx => {
        const { Component, router, ctx } = appCtx;
        const headers = ctx.req ? ctx.req.headers : {};
        const apollo = initApollo(client, { ctx, headers });
        const apolloState = {};
        const { getInitialProps } = App;

        let appProps = { pageProps: {} };

        if (getInitialProps) {
          ctx.apolloClient = apollo;
          appProps = await getInitialProps(appCtx);
        }

        if (ctx.res && ctx.res.finished) {
          return {};
        }

        if (
          options.getDataFromTree === 'always' ||
          (options.getDataFromTree === 'ssr' && ssrMode)
        ) {
          //          try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloState={apolloState}
              apollo={apollo}
            />
          );
          /*
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            console.error('GraphQL error occurred [getDataFromTree]', error);
          }
          */

          if (ssrMode) {
            // getDataFromTree does not call componentWillUnmount
            // head side effect therefore need to be cleared manually
            Head.rewind();
          }

          apolloState.data = apollo.cache.extract();
        }

        return {
          ...appProps,
          apolloState
        };
      };

      constructor(props) {
        super(props);

        this.apollo = initApollo(client, {
          initialState: props.apolloState.data
        });
      }

      render() {
        return <App {...this.props} apollo={this.apollo} />;
      }
    };
}
