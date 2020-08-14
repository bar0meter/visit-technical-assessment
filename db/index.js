const { Sequelize } = require('sequelize')

//Setting up the config
const sequelize = new Sequelize('visitTest', 'root', 'qwerty@1234', {
  host: 'localhost',
  dialect: 'mysql',
})

// export DB
module.exports = sequelize
