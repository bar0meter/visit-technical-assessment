const Sequelize = require('sequelize')
const DB = require('../db')

const Users = DB.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['name'],
      },
    ],
  }
)

module.exports = Users
