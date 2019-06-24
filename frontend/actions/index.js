import signupActions from './signupActions'
import loginActions from './loginActions'
import logoutActions from './logoutActions'
import authActions from './authActions'
import tokenActions from './tokenActions'

export default {
  ...signupActions,
  ...loginActions,
  ...logoutActions,
  ...authActions,
  ...tokenActions
}
