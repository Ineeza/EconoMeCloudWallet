const config = require('../config')
const Sequelize = require('sequelize')

if (process.env.ECW_ENV == undefined) {
    console.log('==== CONFIG ====')
    console.log(config)
}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
      max: config.db.max,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false
    }
  }
)

module.exports = sequelize