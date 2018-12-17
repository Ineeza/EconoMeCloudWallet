import signupActions from './signupActions'
import authActions from './authActions'
import tokenActions from './tokenActions'

export default {
  ...signupActions,
  ...authActions,
  ...tokenActions
}
