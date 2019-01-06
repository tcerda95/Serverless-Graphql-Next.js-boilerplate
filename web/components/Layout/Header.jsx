import { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Tab, Links, LinkItem, A } from './styles';
import { withUser } from '../../lib/auth';

class Header extends Component {
  NextLink = ({ href, label }) => {
    const { pathname } = this.props.router;

    return (
      <LinkItem>
        <Link prefetch href={href}>
          <A active={href === pathname}>{label}</A>
        </Link>
      </LinkItem>
    );
  }

  render() {
    const { user } = this.props;
    const { NextLink } = this;
    const sign = user ? { href: '/signout', label: 'Sign out' } : { href: '/signin', label: 'Sign in' };

    return (
      <Tab>
        <Links>
          <NextLink href="/" label="Posts" />
          {user && <NextLink href="/newpost" label="New post" />}
          <NextLink href={sign.href} label={sign.label} />
        </Links>
      </Tab>
    );
  }
}

export default withRouter(withUser(Header));
