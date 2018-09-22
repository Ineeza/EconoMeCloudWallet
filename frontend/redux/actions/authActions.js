import Router from 'next/router'
import axios from 'axios'
import { AUTHENTICATE, DEAUTHENTICATE } from '../types'
import { API } from '../../../config'
import { setCookie, removeCookie } from '../../utils/cookie'

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ email, password }, type) => {
  if (type !== 'login' && type !== 'signup') {
    throw new Error('Wrong API call!')
  }

  if (type === 'login') {
    return (dispatch) => {
      axios.post(`${API}/auth/${type}`, { email, password })
        .then((response) => {
          setCookie('X-ECW-ACCESS-TOKEN', response.data.token)
          Router.push('/whoami')
          dispatch({ type: AUTHENTICATE, payload: response.data.token })
        })
        .catch((err) => {
          throw new Error(err)
        })
    }
  }

  if (type === 'signup') {
    return (dispatch) => {
      axios.post(`${API}/auth/${type}`, { email, password })
        .then((response) => {
          Router.push('/login')
          dispatch({ type: AUTHENTICATE, payload: response.data.token })
        })
        .catch((err) => {
          throw new Error(err)
        })
    }
  }
}

// gets the token from the cookie and saves it in the store
const reauthenticate = (token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, payload: token })
  }
}

// removing the token
const deauthenticate = () => {
  console.log('==== Deauthenticate ====')
  return (dispatch) => {
    removeCookie('X-ECW-ACCESS-TOKEN')
    dispatch({ type: DEAUTHENTICATE })
  }
}

export default {
  authenticate,
  reauthenticate,
  deauthenticate
}
