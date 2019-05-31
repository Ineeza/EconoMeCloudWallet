const log4js = require('log4js')
const logger = log4js.getLogger()

logger.level = process.env.ECW_LOG_LEVEL || 'info'

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] [%x{env}] [%h] %m',
        tokens: {
          env: function(logEvent) {
            return process.env.ECW_ENV
          },
        },
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'debug',
    },
  }
})

module.exports = logger
