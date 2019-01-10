import styled from 'styled-components';
import theme from '../../lib/theme';

export const Tab = styled.header`
  background-color: ${theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

export const Links = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 50%;
  max-width: 600px;
`;

export const LinkItem = styled.li`
  display: inline;
  height: 100%;
`;

export const A = styled.a(
  props => `
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.secondary};
  cursor: ${props.active ? 'default' : 'pointer'};
  text-decoration: ${props.active ? 'underline' : 'none'};
`
);
