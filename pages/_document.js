import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {

  setGoogleTags() {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-168907858-1');        
        `
      }
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head >
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" type="image/png" href="/images/favicon.ico" />

          <link rel="stylesheet" href="/bootstrap/bootstrap.min.css" />

          <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="/css/styles.css" />
          <link rel="stylesheet" href="/css/components.css" />
          <link rel="stylesheet" href="/css/text.css" />
          
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
          />

          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-168907858-1"></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />
        </Head>

        <body>
          <Main />
          <NextScript />

          <script src="/bootstrap/jquery-3.2.1.slim.min.js"></script>
          <script src="/bootstrap/bootstrap.min.js"></script>
          <script src="/bootstrap/popper.min.js"></script>
        </body>

      </Html>
    );

  }     //end render()

}   //end class

export default MyDocument;