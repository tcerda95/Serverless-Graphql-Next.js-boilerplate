import PropTypes from 'prop-types';
import styled from 'styled-components';
import Head from 'next/head';
import Header from './Header';

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

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Layout;
