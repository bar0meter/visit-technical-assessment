const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')

const app = express()
require('dotenv').config()

const users = require('./routes/users')
const fileUpload = require('./routes/file_upload')
const { startCronTask } = require('./cron/index')
const DB = require('./db')

const PORT = process.env.PORT

// server routes
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/users', users)
app.use('/file_upload', fileUpload)

const dbName = process.env.DB
mysql
  .createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  .then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then((res) => {
      console.info('Database create or successfully checked')

      // DB sync (for testing purose using force true => drop and create tables)
      DB.sync({ force: true }).then(() => console.log('DB Sync done'))
    })
  })

// start cron tasks
startCronTask()

app.listen(PORT, (err) => {
  console.log('Server running on PORT : ', PORT)
  if (err) console.error('Error : ', err)
})
