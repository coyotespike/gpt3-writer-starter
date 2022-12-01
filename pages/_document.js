import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="AI Card Assistant" key="title" />
        <meta
          property="og:description"
          content="Write your card with us and we will send it to your friends"
          key="description"
        />
      </Head>
      <body className="body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
