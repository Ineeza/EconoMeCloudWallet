import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

export const initStore = (initialState = {}) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers((applyMiddleware(thunk)))
  )
}
