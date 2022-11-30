import { createGlobalStyle } from "styled-components";
import { Fragment } from "react";
import "./styles.css";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
`;

function App({ Component, pageProps }) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  );
}
export default App;
