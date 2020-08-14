const CronJob = require('cron').CronJob
const fs = require('fs')
const fastCsv = require('fast-csv')
const util = require('util')

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
        .on('data', function (data) {
          csvData.push(data)
        })
        .on('end', function () {
          // remove the first line: header
          csvData.shift()
          console.log(csvData)

          // connect to the MySQL database
          // save csvData
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
