const env =
    (process.env.ECW_ENV === undefined || process.env.ECW_ENV === '')
      ? 'dev_env' : 'default_env'

const dev_env = require('./env/development')
const default_env = require('./env/default')

const config = {
  dev_env,
  default_env
}

module.exports = config[env]
