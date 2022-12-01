import { createGlobalStyle } from "styled-components";
import { Fragment } from "react";
import "./styles.css";

import { BackgroundImage, Card, ImageGallery } from "../components";
import { ContextProvider } from "./Context";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
`;

function App({ Component, pageProps }) {
  return (
    <Fragment>
      <ContextProvider>
        <div>
          <BackgroundImage />
          <GlobalStyle />
          <Component {...pageProps} />
        </div>
      </ContextProvider>
    </Fragment>
  );
}
export default App;
