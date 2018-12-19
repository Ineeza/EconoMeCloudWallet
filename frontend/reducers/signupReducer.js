import update from 'react-addons-update'
import { SET_EMAIL_SIGNUP, SET_PASSWORD_SIGNUP } from '../constants/types'

const initialState = {
  email: '',
  password: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL_SIGNUP:
      return update(state, { email: { $set: action.payload } })
    case SET_PASSWORD_SIGNUP:
      return update(state, { password: { $set: action.payload } })
    default:
      return state
  }
}
