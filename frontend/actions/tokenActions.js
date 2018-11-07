import { ADD_TOKEN, REMOVE_TOKEN } from '../constants/types'

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
  addToken,
  removeToken
}
