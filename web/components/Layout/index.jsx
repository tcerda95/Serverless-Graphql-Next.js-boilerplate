import styled from '@emotion/styled';
import Header from './Header';
import Head from 'next/head';

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 30px;
`;

const Layout = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  </div>
);

export default Layout;
