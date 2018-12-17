import { SET_EMAIL, SET_PASSWORD } from '../constants/types'

const initialState = {
  email: '',
  password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { tokens: action.payload }
    case SET_PASSWORD:
      return { tokens: action.payload }
    default:
      return state
  }
}
