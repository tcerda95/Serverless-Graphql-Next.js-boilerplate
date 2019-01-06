import React, { Component } from 'react';
import jsCookie from 'js-cookie';
import nextCookies from 'next-cookies';
import hoistNonReactStatic from 'hoist-non-react-statics';

class Authentication {
  signIn(user) {
    jsCookie.set('user', user, { expires: 1 });
  }

  loggedUser(context) {
    if (this.isLogged(context))
      return JSON.parse(nextCookies(context).user);

    return null;
  }

  isLogged(context) {
    return !!nextCookies(context).user;
  }
}

const auth = new Authentication();

export const withUserApp = App => {
  return class extends Component {
    static async getInitialProps(appCtx) {
      const { ctx } = appCtx;
      let appProps = {};

      const user = auth.loggedUser(ctx);
      ctx.user = user;

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appCtx);
      }

      return { ...appProps, user };    
    }

    render() {
      return <App {...this.props} />;
    }
  }
}
  
const UserContext = React.createContext(null);

export class UserProvider extends Component {
  render() {
    const { user, children } = this.props;

    return (
      <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    );
  }
};

export const withUser = WrappedComponent => props => (
  <UserContext.Consumer>
    {user => <WrappedComponent user={user} {...props}/>}
  </UserContext.Consumer>
);

export default auth;
