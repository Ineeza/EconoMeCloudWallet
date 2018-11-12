import { GET_TOKEN_LIST, ADD_TOKEN, REMOVE_TOKEN } from '../constants/types'
import axiosBase from 'axios'
import { apiHost } from '../../backend/config'

const reqGen = (jwt) => {
  const axios = axiosBase.create({
    baseURL: apiHost,
    headers: {
      'X-ECW-ACCESS-TOKEN': jwt
    }
  })
  return axios
}

const getTokenList = (jwt) => {
  const request = reqGen(jwt)
  return (dispatch) => {
    request.get(`/api/token`)
      .then((response) => {
        dispatch({ type: GET_TOKEN_LIST, payload: response.data.tokens })
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}

const addToken = (jwt, { contractAddress, name, symbol, decimal }) => {
  const request = reqGen(jwt)
  return (dispatch) => {
    request.post(`/api/token`, { contractAddress, name, symbol, decimal }).then((response) => {
      dispatch({ type: ADD_TOKEN, payload: response.data.token })
    }).catch((err) => {
      throw new Error(err)
    })
  }
}

const removeToken = () => {
  return (dispatch) => {
    dispatch({ type: REMOVE_TOKEN, payload: [] })
  }
}

export default {
  getTokenList,
  addToken,
  removeToken
}
