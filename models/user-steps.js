const Sequelize = require('sequelize')
const DB = require('../db')
const Users = require('./user')

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
      references: {
        model: 'users',
        key: 'id',
      },
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
    indexes: [
      {
        fields: ['userId', 'date'],
      },
    ],
  }
)

module.exports = UserSteps
