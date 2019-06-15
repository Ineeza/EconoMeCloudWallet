// TODO delete default top_secret
const secretKey = process.env.ECW_JWT_SECRET || 'top_secret'

module.exports = secretKey
