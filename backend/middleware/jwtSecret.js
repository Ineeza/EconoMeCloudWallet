// @flow strict

// TODO delete default top_secret
const secretKey = (typeof(process.env.ECW_JWT_SECRET) != 'undefined' &&
     process.env.ECW_JWT_SECRET != null) ? process.env.ECW_JWT_SECRET : 'top_secret'


module.exports = secretKey
