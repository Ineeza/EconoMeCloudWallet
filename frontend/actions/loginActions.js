import { SET_EMAIL_LOGIN, SET_PASSWORD_LOGIN } from '../constants/types'

const setEmailLogin = (email) => {
  return (dispatch) => {
    dispatch({ type: SET_EMAIL_LOGIN, payload: email })
  }
}

const setPasswordLogin = (password) => {
  return (dispatch) => {
    dispatch({ type: SET_PASSWORD_LOGIN, payload: password })
  }
}

export default {
  setEmailLogin,
  setPasswordLogin
}
