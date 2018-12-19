import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tokenReducer from './tokenReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  tokenList: tokenReducer,
  signupForm: signupReducer,
  loginForm: loginReducer
})

export default rootReducer
