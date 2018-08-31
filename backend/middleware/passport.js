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
  }
})

const AccountModel = require('../model/account')(sequelize, Sequelize.DataTypes)

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    AccountModel.create({ email: email, password: password })
      .spread((account, created) => {
        console.log(account.get({ plain: true }))
        return done(null, account)
      })
  } catch (error) {
    done(error)
  }
}))

// passport.use('login', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// }, async (email, password, done) => {
//   try {
//     const user = await AccountModel.findOne({ email })
//     if (!user) {
//       return done(null, false, { message: 'User not found' })
//     }
//     const validate = await user.isValidPassword(password)
//     if (!validate) {
//       return done(null, false, { message: 'Wrong Password' })
//     }
//     return done(null, user, { message: 'Logged in Successfully' })
//   } catch (error) {
//     return done(error)
//   }
// }))
// 
// passport.use(new JWTstrategy({
//   secretOrKey: 'top_secret',
//   jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
// }, async (token, done) => {
//   try {
//     return done(null, token.user)
//   } catch (error) {
//     done(error)
//   }
// }))
