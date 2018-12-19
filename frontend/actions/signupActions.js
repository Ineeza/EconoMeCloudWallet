import { SET_EMAIL_SIGNUP, SET_PASSWORD_SIGNUP } from '../constants/types'

const setEmail = (email) => {
  return (dispatch) => {
    dispatch({ type: SET_EMAIL_SIGNUP, payload: email })
  }
}

const setPassword = (password) => {
  return (dispatch) => {
    dispatch({ type: SET_PASSWORD_SIGNUP, payload: password })
  }
}

export default {
  setEmail,
  setPassword
}
