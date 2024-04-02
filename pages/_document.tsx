import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  override render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/RobotiiveLogo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
