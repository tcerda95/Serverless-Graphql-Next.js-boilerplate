import styled from '@emotion/styled';
import Header from './Header';

const Container = styled.main`
  background-color: #FAFAFA;
  max-width: 800px;
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
