import { GET_TOKEN_LIST, ADD_TOKEN, REMOVE_TOKEN } from '../constants/types'
import axiosBase from 'axios'
import { apiHost } from '../../backend/config'

const response = [
  {
    id: '3',
    account_id: '19',
    contract_address: '0x66e3e42a6f0f2690a1a5207047c26f5f6d73ecdb',
    name: 'Poke Coin',
    symbol: 'TSC',
    decimal: '18'
  }
]

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
  if (jwt) {
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
}

const addToken = () => {
  return (dispatch) => {
    dispatch({ type: ADD_TOKEN, payload: response })
  }
}

const removeToken = () => {
  return (dispatch) => {
    dispatch({ type: REMOVE_TOKEN, payload: response })
  }
}

export default {
  getTokenList,
  addToken,
  removeToken
}
