import Link from 'next/link';
import { withRouter } from 'next/router';
import { Tab, Links, LinkItem, A } from './styles';

const NextLink = ({ href, children, currentPathname }) => (
  <LinkItem>
    <Link prefetch href={href}>
      <A active={href === currentPathname}>{children}</A>
    </Link>
  </LinkItem>
);

const Header = ({ router }) => {
  const { pathname } = router;

  return (
    <Tab>
      <Links>
        <NextLink href="/" currentPathname={pathname}>Posts</NextLink>
        <NextLink href="/signin" currentPathname={pathname}>Sign in</NextLink>
      </Links>
    </Tab>
  );
};

export default withRouter(Header);
