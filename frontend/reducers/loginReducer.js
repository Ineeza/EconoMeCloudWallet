import update from 'react-addons-update'
import { SET_EMAIL_ON_LOGIN, SET_PASSWORD_ON_LOGIN } from '../constants/types'

const initialState = {
  email: '',
  password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL_ON_LOGIN:
      return update(state, { email: { $set: action.payload } })
    case SET_PASSWORD_ON_LOGIN:
      return update(state, { password: { $set: action.payload } })
    default:
      return state
  }
}
