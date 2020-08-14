const express = require('express')
const router = express.Router()

const users = {
  '45225': {
    name: 'Aditya Raisinghani',
    date: '1529865000000',
    steps: '6364',
    calories: '1965',
  },
}

router.get('/', function (req, res) {
  res.send('Hello Users')
})

router.get('/:id', function (req, res) {
  const { id: userId } = req.params
  res.send(users[userId])
})

module.exports = router
