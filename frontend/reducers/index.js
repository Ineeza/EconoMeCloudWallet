import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tokenReducer from './tokenReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import { SET_LOGOUT } from '../constants/types'

const appReducer = combineReducers({
  authentication: authReducer,
  tokenList: tokenReducer,
  signupForm: signupReducer,
  loginForm: loginReducer
})

const rootReducer = (state, action) => {
  if (action.type === SET_LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
