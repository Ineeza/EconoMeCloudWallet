import { SET_EMAIL, SET_PASSWORD } from '../constants/types'
import axiosBase from 'axios'
import { apiHost } from '../../backend/config'
import { JWT_KEY } from '../constants/keys'

const reqGen = (jwt) => {
  const axios = axiosBase.create({
    baseURL: apiHost,
    headers: {
      [JWT_KEY]: jwt
    }
  })
  return axios
}

const setEmail = (email) => {
  return (dispatch) => {
    dispatch({ type: SET_EMAIL, payload: email })
  }
}

const setPassword = (password) => {
  return (dispatch) => {
    dispatch({ type: SET_PASSWORD, payload: password })
  }
}

export default {
  setEmail,
  setPassword
}
