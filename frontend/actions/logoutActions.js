import { SET_LOGOUT } from '../constants/types'

const setLogout = () => {
  return (dispatch) => {
    dispatch({ type: SET_LOGOUT })
  }
}

export default {
  setLogout
}
