import Router from 'next/router'
import actions from '../redux/actions'

// checks if the page is being loaded on the server, and if so, get auth token from the cookie
export default function (ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      // FIXME getCookie doesn't work
      const cookieStr = ctx.req.headers.cookie.replace('X-ECW-ACCESS-TOKEN=', '')
      ctx.store.dispatch(actions.reauthenticate(cookieStr))
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
