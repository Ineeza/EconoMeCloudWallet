import { combineReducers } from 'redux'
import authReducer from './authReducer'
import tokenReducer from './tokenReducer'

const rootReducer = combineReducers({
  authentication: authReducer,
  addToken: tokenReducer
})

export default rootReducer