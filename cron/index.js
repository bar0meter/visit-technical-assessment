const DBUpload = require('./db_upload')

const startCronTask = function () {
  console.log('Staring cron tasks')
  DBUpload.start()
}

module.exports = {
  startCronTask,
}
