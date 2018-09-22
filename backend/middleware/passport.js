const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const Sequelize = require('sequelize')
const sequelize = require('./sequelize')
const AccountModel = require('../model/account')(sequelize, Sequelize.DataTypes)
const KeystoreModel = require('../model/keystore')(sequelize, Sequelize.DataTypes)

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    bcrypt.hash(password, 10).then((hash) => {
      AccountModel.findOrCreate({ where: { email: email }, defaults: { email: email, password: hash } })
        .then(account => {
          return done(null, { email: email })
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
