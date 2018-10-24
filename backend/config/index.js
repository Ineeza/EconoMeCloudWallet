const env =
    (process.env.ECW_ENV === undefined || process.env.ECW_ENV === '')
      ? 'localEnv' : process.env.ECW_ENV + 'Env'

const localEnv = require('./env/local')
const testEnv = require('./env/testing')
const devEnv = require('./env/development')
const stgEnv = require('./env/staging')
const prdEnv = require('./env/production')

const config = {
  localEnv,
  testEnv,
  devEnv,
  stgEnv,
  prdEnv
}

module.exports = config[env]
