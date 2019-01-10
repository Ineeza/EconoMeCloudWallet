const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const keythereum = require('keythereum')
const ethereum = require('web3')
const { Account, Keystore } = require('../model')

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    bcrypt.hash(password, 10).then((hash) => {
      Account.findAndCountAll({ where: { email: email } }).then(result => {
        if (result.count > 0) {
          done(null, { error: '409' })
        }
        Account.findOrCreate({ where: { email: email }, defaults: { email: email, password: hash } })
          .spread((account, created) => {
            const params = { keyBytes: 32, ivBytes: 16 }
            const dk = keythereum.create(params)

            // Pass userName and password as Http POST paramters
            console.log('Account ID: ' + account.id)

            // Save keystore to database
            const keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, ethereum.options)
            const keystoreStr = JSON.stringify(keyObject)
            Keystore.findOrCreate({ where: { account_id: account.id }, defaults: { account_id: account.id, content: keystoreStr } })
              .then(keystore => { return done(null, { email: email }) })
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
    const account = await Account.findOne({ where: { email: email } })
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
