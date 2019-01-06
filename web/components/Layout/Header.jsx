import Link from 'next/link';
import { withRouter } from 'next/router';
import { Tab, Links, LinkItem, A } from './styles';
import { withUser } from '../../lib/auth';

const NextLink = ({ href, children, currentPathname }) => (
  <LinkItem>
    <Link prefetch href={href}>
      <A active={href === currentPathname}>{children}</A>
    </Link>
  </LinkItem>
);

const Header = ({ router, user }) => {
  const { pathname } = router;
  const sign = user ? { href: '/signout', text: 'Sign out' } : { href: '/signin', text: 'Sign in' };

  return (
    <Tab>
      <Links>
        <NextLink href="/" currentPathname={pathname}>Posts</NextLink>
        {user && <NextLink href="/newpost" currentPathname={pathname}>New post</NextLink>}
        <NextLink href={sign.href} currentPathname={pathname}>{sign.text}</NextLink>
      </Links>
    </Tab>
  );
};

export default withRouter(withUser(Header));
