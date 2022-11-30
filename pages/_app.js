import { createGlobalStyle } from "styled-components";
import { Fragment } from "react";

import "./styles.css";

const backgroundUrl =
  "https://image.lexica.art/md/2841bf4d-921a-4dfe-b4b8-188926c61d09?fit=crop&w=1920&h=1080";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  background-color: #928A97;
  background: url(${backgroundUrl}) no-repeat center center fixed;
  background-size: cover;
  overflow: hidden;
}
`;

function App({ Component, pageProps }) {
  return (
    <Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  );
}
export default App;
