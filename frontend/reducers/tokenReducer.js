import { GET_TOKEN_LIST, ADD_TOKEN, REMOVE_TOKEN } from '../constants/types'

const initialState = {
  tokens: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_LIST:
      return { tokens: action.payload }
    case ADD_TOKEN:
      return { tokens: action.payload }
    case REMOVE_TOKEN:
      return { tokens: action.payload }
    default:
      return state
  }
}
