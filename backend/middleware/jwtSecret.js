const logger = require('./logger')

// TODO delete default top_secret
const secretKey = process.env.ECW_JWT_SECRET || 'top_secret'

if (secretKey == 'top_secret') {
    logger.debug('ECW_JWT_SECRET is defined')
}

module.exports = secretKey
