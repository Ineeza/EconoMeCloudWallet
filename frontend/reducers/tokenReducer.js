import { ADD_TOKEN, REMOVE_TOKEN } from '../constants/types'

const dummy = [
  {
    id: '3',
    account_id: '19',
    contract_address: '0x66e3e42a6f0f2690a1a5207047c26f5f6d73ecdb',
    name: 'Hoge Coin',
    symbol: 'TSC',
    decimal: '18',
    created_date: '2018-10-15T02:09:22.887Z',
    updated_date: null,
    created_by: 'CURRENT_USER',
    updated_by: null
  },
  {
    id: '4',
    account_id: '26',
    contract_address: '0x66e3e42a6f0f2690a1a5207047c26f5f6d73ecdb',
    name: 'Hoge Coin 1',
    symbol: 'TSC1',
    decimal: '18',
    created_date: '2018-10-22T19:11:22.297Z',
    updated_date: null,
    created_by: 'CURRENT_USER',
    updated_by: null
  },
  {
    id: '5',
    account_id: '26',
    contract_address: '0x66e3e42a6f0f2690a1a5207047c26f5f6d73ecdb',
    name: 'Hoge Coin 2',
    symbol: 'TSC2',
    decimal: '18',
    created_date: '2018-10-22T19:11:22.297Z',
    updated_date: null,
    created_by: 'CURRENT_USER',
    updated_by: null
  },
  {
    id: '6',
    account_id: '26',
    contract_address: '0x66e3e42a6f0f2690a1a5207047c26f5f6d73ecdb',
    name: 'Hoge Coin 3',
    symbol: 'TSC3',
    decimal: '18',
    created_date: '2018-10-22T19:11:22.297Z',
    updated_date: null,
    created_by: 'CURRENT_USER',
    updated_by: null
  }
]

const initialState = {
  tokens: dummy
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return { tokens: dummy }
    case REMOVE_TOKEN:
      return { token: dummy }
    default:
      return state
  }
}
