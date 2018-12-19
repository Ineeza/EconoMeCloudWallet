import update from 'react-addons-update'
import { SET_EMAIL, SET_PASSWORD } from '../constants/types'

const initialState = {
  email: '',
  password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return update(state, { email: { $set: action.payload } })
    case SET_PASSWORD:
      return update(state, { password: { $set: action.payload } })
    default:
      return state
  }
}
