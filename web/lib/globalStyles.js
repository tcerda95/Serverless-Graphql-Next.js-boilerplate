import { css } from '@emotion/core';

export default css`
  * {
    font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif;
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
    background-color: #FAFAFA;
    margin: 0;
  }

  a {
    color: #22BAD9;
    text-decoration: none;
  }

  button {
    align-items: center;
    background-color: #22BAD9;
    border: 0;
    color: white;
    display: flex;
    padding: 5px 7px;
    transition: background-color .3s;
  }

  button:active {
    background-color: #1B9DB7;
    transition: background-color .3s;
  }

  button:focus {
    outline: none
  }
`;
