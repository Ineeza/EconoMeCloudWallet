import { ADD_TOKEN, REMOVE_TOKEN } from '../constants/types'

const addToken = () => {
  return (dispatch) => {
    dispatch({ type: ADD_TOKEN })
  }
}

const removeToken = () => {
  return (dispatch) => {
    dispatch({ type: REMOVE_TOKEN })
  }
}

export default {
  addToken,
  removeToken
}
