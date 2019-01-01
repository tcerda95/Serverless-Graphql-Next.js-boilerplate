import styled from '@emotion/styled';
import Header from './Header';

const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

const Layout = ({ children }) => (
  <div>
    <Header />
    <Container>
      {children}
    </Container>
  </div>
);

export default Layout;
