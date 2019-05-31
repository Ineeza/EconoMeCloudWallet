const config = require('../config')
const Sequelize = require('sequelize')
const colors = require('colors/safe')
const logger = require('./logger')

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: config.db.max,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false
    },
    // FIXME default false
    benchmark: process.env.ECW_LOG_QUERY || true,
    logging: (logStr, execTime, options) => {
      if (!options) {
        options = execTime
        execTime = undefined
      }
      let col = null
      switch (options.type) {
        case 'SELECT':
          col = colors.blue.bold
          break
        case 'UPDATE':
          col = colors.yellow.bold
          break
        case 'INSERT':
          col = colors.green.bold
          break
        case 'DELETE':
          col = colors.red.bold
          break
        default:
          col = colors.white.bold
          break
      }
      // FIXME default false
      let log = process.env.ECW_LOG_QUERY || true
      if (log) {
        if (execTime) {
          logger.debug(colors.magenta.bold(`[${execTime} ms]`), col(logStr))
        } else {
          logger.debug(col(logStr))
        }
      }
    }
  }
)

module.exports = sequelize
