import { createGlobalStyle } from "styled-components";
import { Fragment } from "react";
import Image from "next/image";

import "./styles.css";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
`;

function App({ Component, pageProps }) {
  return (
    <Fragment>
      <GlobalStyle />
      <Image
        src="/backgroundImage.webp"
        alt="Generated on Lexica with: wide view of white snowy landscape with gently rolling hills, elegant crisp line drawing, pine trees in the distant background, two small reindeer grazing at the edges, 1920 pixels wide x 1080 pixels high"
        layout="fill"
        objectFit="cover"
        zIndex="-1"
      />
      <Component {...pageProps} />
    </Fragment>
  );
}
export default App;
