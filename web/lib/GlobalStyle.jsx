import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    font-family: Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono',
      'Bitstream Vera Sans Mono', 'Courier New', monospace, serif;
    box-sizing: border-box;
    color: #000c;
  }

  p {
    margin: 0;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #fafafa;
    margin: 0;
  }

  a {
    color: #22bad9;
    text-decoration: none;
  }

  button:focus {
    outline: none;
  }
`;
