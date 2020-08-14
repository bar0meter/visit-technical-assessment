const Sequelize = require('sequelize')
const DB = require('../db')

const UserSteps = DB.define(
  'userSteps',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    steps: {
      type: Sequelize.INTEGER,
    },
    calories: {
      type: Sequelize.DOUBLE,
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
)

module.exports = UserSteps
