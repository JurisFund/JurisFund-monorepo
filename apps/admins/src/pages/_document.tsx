// import { randomBytes } from "crypto";
import Document, {
  type DocumentContext,
  type DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
// import { getCspContent } from "utils";

class MyDocument extends Document {
  static override async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  override render() {
    // const csp = getCspContent(NextScript.getInlineScriptSource(this.props));
    // const nonce = randomBytes(128).toString("base64");
    // const csp = `object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'`;

    return (
      <Html lang="en">
        <Head /* nonce={nonce} */>
          {/* <meta httpEquiv="Content-Security-Policy" content={csp} /> */}
          {/* <meta httpEquiv="Content-Security-Policy" content={csp} /> */}

          <meta name="JurisFund Admin" content="JurisFund Admin" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="JurisFund Admin" />
          <meta
            name="description"
            content="JurisFund is a private credit protocol backed by consumer pre-settlement funding.
            This protocol offers investors an opportunity to get exposure to a unique asset
            class, notable for its lack of correlation with broader market trends and its
            history of high returns."
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          {/* <meta name="msapplication-TileColor" content="#2B5797" /> */}
          <meta name="msapplication-tap-highlight" content="no" />
          {/* <meta name="theme-color" content="#000000" /> */}

          {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body className="bg-neutral-50 dark:bg-neutral-900">
          <Main />
          <NextScript /* nonce={nonce} */ />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
