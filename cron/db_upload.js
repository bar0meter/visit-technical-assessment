const CronJob = require('cron').CronJob
const fs = require('fs')
const fastCsv = require('fast-csv')
const util = require('util')
const moment = require('moment')

const Users = require('../models/user')
const UserSteps = require('../models/user-steps')
const DB = require('../db')

const readdir = util.promisify(fs.readdir)

const task = async () => {
  console.log('starting parsing of csv files' + new Date())

  try {
    const files = await readdir('uploads')
    if (files.length === 0) {
      console.log('No files available')
      return
    }

    files.forEach((file) => {
      const csvData = []
      fastCsv
        .parseFile(`uploads/${file}`)
        .on('data', (data) => {
          if (!!data && data.length !== 0) {
            csvData.push(data)
          }
        })
        .on('end', async () => {
          // remove the first line: header
          csvData.shift()
          // save csvData
          for (const data of csvData) {
            console.log(`Saving entry: ${data}`)
            await insertUserStepsEntry(data)
          }
        })
    })
  } catch (err) {
    console.error(err.message)
  }
}

// run cron on first minute of every hour
const DBUpload = new CronJob('1 * * * *', async function () {
  await task()
})

const insertUserStepsEntry = async (data) => {
  const userId = data[0]
  const name = data[1]
  const stepsDate = new Date(parseInt(data[2], 10))
  const date = moment(stepsDate).format('YYYY-MM-DD H:mm:ss')
  const steps = data[3]
  const calories = data[4]

  try {
    // Start transaction
    await DB.transaction(async () => {
      // find user by id
      const user = await Users.findByPk(userId)
      // check if user exists, if not insert it
      if (!user) {
        console.log(`Creating user with ID: ${userId}, name: ${name}`)
        await Users.create({ id: userId, name })
      }
      // add user steps entry
      await UserSteps.create({
        userId,
        steps,
        calories,
        date,
      })
    })
    console.log(
      `Added user steps entry for user with id: ${userId}, for date : ${moment(
        stepsDate
      ).format('YYYY-MM-DD')}, steps: ${steps}, calories: ${calories}`
    )
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = DBUpload
