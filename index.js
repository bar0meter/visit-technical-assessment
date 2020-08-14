const express = require('express')
const app = express()

const router = require('./routes')
const PORT = 3000

router(app)

app.listen(PORT, (err) => {
  console.log('Server running on PORT : ', PORT)
  if (err) console.error('Error : ', err)
})
