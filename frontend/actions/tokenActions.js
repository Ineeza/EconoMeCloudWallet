import { GET_TOKEN_LIST, ADD_TOKEN, SEND_TOKEN, SEND_ETH, REMOVE_TOKEN, SET_TARGET_CONTRACT } from '../constants/types'
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
      dispatch({ type: ADD_TOKEN, payload: response.data.tokens })
    }).catch((err) => {
      throw new Error(err)
    })
  }
}

const sendToken = (jwt, { password, recipientAddress, amount, contractAddress }) => {
  const request = reqGen(jwt)
  return (dispatch) => {
    request.post(`/api/tx`, { password, recipientAddress, amount, contractAddress }).then((response) => {
      dispatch({ type: SEND_TOKEN, payload: response.data.transactionHash })
    }).catch((err) => {
      throw new Error(err)
    })
  }
}

const sendEth = (jwt, { password, recipientAddress, amount }) => {
  const request = reqGen(jwt)
  return (dispatch) => {
    request.post(`/api/eth`, { password, recipientAddress, amount }).then((response) => {
      dispatch({ type: SEND_ETH, payload: response.data.transactionHash })
    }).catch((err) => {
      throw new Error(err)
    })
  }
}

const removeToken = (jwt, id) => {
  const request = reqGen(jwt)
  return (dispatch) => {
    request.delete(`/api/token/${id}`).then((response) => {
      dispatch({ type: REMOVE_TOKEN, payload: response.data.tokens })
    }).catch((err) => {
      throw new Error(err)
    })
  }
}

const setTargetContract = (contractAddress) => {
  return (dispatch) => {
    dispatch({ type: SET_TARGET_CONTRACT, payload: contractAddress })
  }
}

export default {
  getTokenList,
  addToken,
  sendToken,
  sendEth,
  removeToken,
  setTargetContract
}
