const CronJob = require('cron').CronJob
const fs = require('fs')
const fastCsv = require('fast-csv')
const util = require('util')
const moment = require('moment')

const Users = require('../models/user')
const UserSteps = require('../models/user-steps')

const readdir = util.promisify(fs.readdir)

const csvData = []

const task = async function () {
  console.log('starting parsing of csv files' + new Date())

  try {
    const files = await readdir('uploads')
    if (files.length === 0) {
      console.log('No files available')
      return
    }

    files.forEach((file) => {
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
          // connect to the MySQL database
          // save csvData
          for (const data of csvData) {
            const userId = data[0]
            const name = data[1]
            const date = moment(new Date(parseInt(data[2], 10))).format(
              'YYYY-MM-DD H:mm:ss'
            )
            const steps = data[3]
            const calories = data[4]

            try {
              await Users.create({ id: userId, name })
              await UserSteps.create({ userId, steps, calories, date })
            } catch (err) {
              console.error(err.message)
            }
          }
        })
    })
  } catch (err) {
    console.error(err.message)
  }
}

const DBUpload = new CronJob('* * * * *', async function () {
  await task()
})

module.exports = DBUpload
