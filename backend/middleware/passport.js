const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const Sequelize = require('sequelize')
const sequelize = require('./sequelize')
const AccountModel = require('../model/account')(sequelize, Sequelize.DataTypes)
const KeystoreModel = require('../model/keystore')(sequelize, Sequelize.DataTypes)

const keythereum = require('keythereum')
const Web3 = require('web3')
const options = {
  kdf: 'pbkdf2',
  cipher: 'aes-128-ctr',
  kdfparams: {
    c: 262144,
    dklen: 32,
    prf: 'hmac-sha256'
  }
}
let web3
const RINKEBY_URL = 'https://rinkeby.infura.io/xyji23ngACpAtbvoO0MZ'

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    bcrypt.hash(password, 10).then((hash) => {
      AccountModel.findOrCreate({ where: { email: email }, defaults: { email: email, password: hash } })
        .spread((account, created) => {
          const params = { keyBytes: 32, ivBytes: 16 }
          const dk = keythereum.create(params)

          if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider)
          } else {
            web3 = new Web3(new Web3.providers.HttpProvider(RINKEBY_URL))
          }

          // Pass userName and password as Http POST paramters
          console.log('=== User Info ===')
          console.log('Accoiunt ID: ' + account.id)

          // Save keystore to database
          const keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options)
          const keystoreStr = JSON.stringify(keyObject)
          KeystoreModel.findOrCreate({ where: { account_id: account.id }, defaults: { account_id: account.id, content: keystoreStr } })
            .then(keystore => {
              return done(null, { email: email })
            })
        })
    })
  } catch (error) {
    done(error)
  }
}))

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const account = await AccountModel.findOne({ where: { email: email } })
    if (!account) {
      return done(null, false, { message: 'Account not found' })
    }
    const validate = await bcrypt.compare(password, account.password)
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' })
    }
    return done(null, account, { message: 'Logged in Successfully' })
  } catch (error) {
    return done(error)
  }
}))

passport.use(new JWTstrategy({
  secretOrKey: 'top_secret',
  jwtFromRequest: ExtractJWT.fromHeader('X-ECW-ACCESS-TOKEN'.toLowerCase())
}, async (token, done) => {
  try {
    return done(null, token.account)
  } catch (error) {
    done(error)
  }
}))
