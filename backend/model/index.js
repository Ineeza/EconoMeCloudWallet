const Sequelize = require('sequelize')
const sequelize = require('../middleware/sequelize')
const Account = require('./account')(sequelize, Sequelize.DataTypes)
const Keystore = require('./keystore')(sequelize, Sequelize.DataTypes)
const Token = require('./token')(sequelize, Sequelize.DataTypes)

module.exports = {
  Account: Account,
  Keystore: Keystore,
  Token: Token
}
