import signupActions from './signupActions'
import loginActions from './loginActions'
import authActions from './authActions'
import tokenActions from './tokenActions'

export default {
  ...signupActions,
  ...loginActions,
  ...authActions,
  ...tokenActions
}
