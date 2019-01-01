import Link from 'next/link';
import { withRouter } from 'next/router';
import styled from '@emotion/styled';

const Tab = styled.header`
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const Links = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 30%;
  max-width: 600px;
`;

const LinkItem = styled.li`
  display: inline;
  height: 100%;
`;

const A = styled.a(props => `
  font-size: 18px;
  font-weight: 600;
  color: ${props.theme.colors.secondary};
  cursor: ${props.active ? 'default' : 'pointer'};
  text-decoration: ${props.active ? 'underline' : 'none'};
`);

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
