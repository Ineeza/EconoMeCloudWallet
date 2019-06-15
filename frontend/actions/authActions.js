import Router from 'next/router'
import axiosBase from 'axios'
import { apiHost } from '../../backend/config'
import { AUTHENTICATE, DEAUTHENTICATE, ERROR_ALERT } from '../constants/types'
import { setCookie, removeCookie } from '../utils/cookie'
import { JWT_KEY } from '../constants/keys'

// gets token from the api and stores it in the redux store and in cookie
const authenticate = ({ email, password }, type) => {
  if (type !== 'login' && type !== 'signup') {
    throw new Error('Wrong API call!')
  }

  if (type === 'login') {
    return (dispatch) => {
      const axios = axiosBase.create({
        baseURL: apiHost
      })
      axios.post(`/auth/${type}`, { email, password })
        .then((response) => {
          setCookie(JWT_KEY, response.data.token)
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
      const axios = axiosBase.create({
        baseURL: apiHost
      })
      axios.post(`/auth/${type}`, { email, password })
        .then((response) => {
          Router.push('/login')
          dispatch({ type: AUTHENTICATE, payload: response.data.token })
        })
        .catch((err) => {
          // TODO 409 user already exists
          dispatch({ type: ERROR_ALERT, error: err.response.status })
          // throw new Error(err)
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
  return (dispatch) => {
    removeCookie(JWT_KEY)
    dispatch({ type: DEAUTHENTICATE })
  }
}

export default {
  authenticate,
  reauthenticate,
  deauthenticate
}
