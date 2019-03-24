import Router from 'next/router'
import actions from '../actions'

// checks if the page is being loaded on the server, and if so, get auth token from the cookie
export default function (ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      var cookie = require('cookie')
      var cookies = cookie.parse(ctx.req.headers.cookie)
      ctx.store.dispatch(actions.reauthenticate(cookies['X-ECW-ACCESS-TOKEN']))
    }
  } else {
    const token = ctx.store.getState().authentication.token

    if (token && (ctx.pathname === '/login' || ctx.pathname === '/signup')) {
      setTimeout(function () {
        Router.push('/')
      }, 0)
    }
  }
}
