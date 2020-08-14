const CronJob = require('cron').CronJob
const fs = require('fs')
const fastcsv = require('fast-csv')

const task = function () {
  console.log('starting parsing of csv files' + new Date())
}

const DBUpload = new CronJob('1 * * * *', function () {
  task()
})

module.exports = DBUpload
