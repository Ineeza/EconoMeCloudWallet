import Document, { Head, Main, NextScript } from 'next/document'

import 'tabler-react/dist/Tabler.css'
import './assets/brand/tabler.svg'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}