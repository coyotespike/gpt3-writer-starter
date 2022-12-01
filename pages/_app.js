import { createGlobalStyle } from "styled-components";
import { Fragment } from "react";
import "./styles.css";

import { BackgroundImage, Card, ImageGallery } from "../components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
`;

function App({ Component, pageProps }) {
  return (
    <Fragment>
      <div>
        <BackgroundImage />
        <GlobalStyle />
        <Component {...pageProps} />
      </div>
    </Fragment>
  );
}
export default App;
