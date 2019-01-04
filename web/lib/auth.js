import jsCookie from 'js-cookie';
import nextCookies from 'next-cookies';

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

export default new Authentication();
