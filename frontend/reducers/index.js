import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tokenReducer from './tokenReducer'
import signupReducer from './signupReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  tokenList: tokenReducer,
  signupForm: signupReducer
})

export default rootReducer
