import { SET_EMAIL_ON_SIGNUP, SET_PASSWORD_ON_SIGNUP } from '../constants/types'

const setEmailOnSignup = (email) => {
  return (dispatch) => {
    dispatch({ type: SET_EMAIL_ON_SIGNUP, payload: email })
  }
}

const setPasswordOnSignup = (password) => {
  return (dispatch) => {
    dispatch({ type: SET_PASSWORD_ON_SIGNUP, payload: password })
  }
}

export default {
  setEmailOnSignup,
  setPasswordOnSignup
}
