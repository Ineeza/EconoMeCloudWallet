import { SET_EMAIL_ON_LOGIN, SET_PASSWORD_ON_LOGIN } from '../constants/types'

const setEmailOnLogin = (email) => {
  return (dispatch) => {
    dispatch({ type: SET_EMAIL_ON_LOGIN, payload: email })
  }
}

const setPasswordOnLogin = (password) => {
  return (dispatch) => {
    dispatch({ type: SET_PASSWORD_ON_LOGIN, payload: password })
  }
}

export default {
  setEmailOnLogin,
  setPasswordOnLogin
}
