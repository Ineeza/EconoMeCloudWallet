import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

import 'tabler-react/dist/Tabler.css'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
