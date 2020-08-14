const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const users = require('./routes/users')
const fileUpload = require('./routes/file_upload')
const { startCronTask } = require('./cron/index')
const { DB } = require('./db')

const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/users', users)
app.use('/file_upload', fileUpload)

DB.authenticate().then(function (err) {
  if (err) {
    console.log('There is connection in ERROR')
  } else {
    console.log('Connection has been established successfully')
  }
})

startCronTask()

app.listen(PORT, (err) => {
  console.log('Server running on PORT : ', PORT)
  if (err) console.error('Error : ', err)
})
