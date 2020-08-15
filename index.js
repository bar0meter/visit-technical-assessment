const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const users = require('./routes/users')
const fileUpload = require('./routes/file_upload')
const { startCronTask } = require('./cron/index')
const DB = require('./db')

const PORT = 3000

// server routes
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/users', users)
app.use('/file_upload', fileUpload)

// check DB connection
DB.authenticate()
  .then(() => console.log('Connection has been established successfully'))
  .catch((err) => console.error(err.message))

// start cron tasks
startCronTask()

app.listen(PORT, (err) => {
  console.log('Server running on PORT : ', PORT)
  if (err) console.error('Error : ', err)
})
