import { ADD_TOKEN, REMOVE_TOKEN } from '../constants/types'

const initialState = {
  tokens: []
}

const dummy = {
  id: '3',
  account_id: '19',
  contract_address: '0x66e3e42a6f0f2690a1a5207047c26f5f6d73ecdb',
  name: 'Neco Coin',
  symbol: 'NSC',
  decimal: '18'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        tokens: action.payload
      }
    case REMOVE_TOKEN:
      return { tokens: [] }
    default:
      return state
  }
}
