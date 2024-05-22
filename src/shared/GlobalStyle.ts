import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    color: #333333;
  }
`;

export default GlobalStyle;
