import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #FFFFFF;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;