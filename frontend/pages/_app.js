import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../redux/'
import initialize from '../utils/initialize'
import Router from 'next/router'
import actions from '../redux/actions'
import { getCookie } from '../utils/cookie'

export default withRedux(initStore, { debug: true })(class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    console.log('===== CONTEXT =====')
    console.log('isServer: ' + ctx.isServer)
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
      }
    }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
})
