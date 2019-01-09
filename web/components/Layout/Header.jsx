import { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Tab, Links, LinkItem, A } from './styles';
import auth, { withUser } from '../../lib/auth';

class Header extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  static defaultProps = {
    user: null
  };

  NextLink = ({ href, label, inactive, onClick = () => {} }) => {
    const { pathname } = this.props.router;

    return (
      <LinkItem>
        <Link prefetch href={href}>
          <A active={!inactive && href === pathname} onClick={onClick}>
            {label}
          </A>
        </Link>
      </LinkItem>
    );
  };

  signOut = () => {
    auth.signOut();
  };

  render() {
    const { user } = this.props;
    const { NextLink } = this;
    const midLink = user
      ? { href: '/newpost', label: 'New post' }
      : { href: '/signup', label: 'Sign up' };
    const rightLink = user
      ? { href: '/', label: 'Sign out', onClick: this.signOut, inactive: true }
      : { href: '/signin', label: 'Sign in' };

    return (
      <Tab>
        <Links>
          <NextLink href="/" label="Posts" />
          <NextLink href={midLink.href} label={midLink.label} />
          <NextLink
            href={rightLink.href}
            label={rightLink.label}
            inactive={rightLink.inactive}
            onClick={rightLink.onClick}
          />
        </Links>
      </Tab>
    );
  }
}

export default withRouter(withUser(Header));
