import { GET_TOKEN_LIST, ADD_TOKEN, SEND_TOKEN, SEND_ETH, REMOVE_TOKEN } from '../constants/types'

const initialState = {
  tokens: [],
  txHash: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_LIST:
      return { tokens: action.payload }
    case ADD_TOKEN:
      return { tokens: action.payload }
    case SEND_TOKEN:
      return { txHash: action.payload }
    case SEND_ETH:
      return { txHash: action.payload }
    case REMOVE_TOKEN:
      return { tokens: action.payload }
    default:
      return state
  }
}
