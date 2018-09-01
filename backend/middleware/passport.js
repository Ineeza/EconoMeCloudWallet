const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const Sequelize = require('sequelize')
const sequelize = new Sequelize('econome', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
})

const AccountModel = require('../model/account')(sequelize, Sequelize.DataTypes)

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
    const account = await AccountModel.findOne({ email })
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
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  try {
    return done(null, token.user)
  } catch (error) {
    done(error)
  }
}))
