import { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Tab, Links, LinkItem, A } from './styles';
import auth, { withUser } from '../../lib/auth';

class Header extends Component {
  NextLink = ({ href, label, inactive, onClick = () => {} }) => {
    const { pathname } = this.props.router;

    return (
      <LinkItem>
        <Link prefetch href={href}>
          <A active={!inactive && href === pathname} onClick={onClick}>{label}</A>
        </Link>
      </LinkItem>
    );
  }

  signOut = () => {
    auth.signOut();
  }

  render() {
    const { user } = this.props;
    const { NextLink } = this;
    const sign = user ? { href: '/', label: 'Sign out', onClick: this.signOut, inactive: true } : { href: '/signin', label: 'Sign in' };

    return (
      <Tab>
        <Links>
          <NextLink href="/" label="Posts" />
          {user && <NextLink href="/newpost" label="New post" />}
          <NextLink href={sign.href} label={sign.label} inactive={sign.inactive} onClick={sign.onClick} />
        </Links>
      </Tab>
    );
  }
}

export default withRouter(withUser(Header));
