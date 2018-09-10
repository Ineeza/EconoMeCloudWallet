const env = process.env.NODE_ENV

const development = require('./env/development')
const production = require('./env/production')

const config = {
  development,
  production
}

module.exports = config[env]
