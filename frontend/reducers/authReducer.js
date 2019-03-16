import { AUTHENTICATE, DEAUTHENTICATE, ERROR_ALERT } from '../constants/types'

const initialState = {
  token: null,
  status: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { token: action.payload }
    case DEAUTHENTICATE:
      return { token: null }
    case ERROR_ALERT:
      return { status: action.error }
    default:
      return state
  }
}
