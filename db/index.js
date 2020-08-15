const { Sequelize } = require('sequelize')
require('dotenv').config()

//Setting up the config
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.HOST,
    dialect: 'mysql',
  }
)

// export DB
module.exports = sequelize
