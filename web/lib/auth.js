import jsCookie from 'js-cookie';
import nextCookies from 'next-cookies';

class Authentication {
  signIn(user) {
    jsCookie.set('user', user, { expires: 1 });
  }

  loggedUser(context) {
    return JSON.parse(nextCookies(context).user);
  }
}

export default new Authentication();
