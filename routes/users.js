const express = require('express')
const router = express.Router()

const Users = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const data = await Users.findAll()
    res.send(data)
  } catch (err) {
    console.log(err.message)
    res.send([])
  }
})

router.get('/:id', async (req, res) => {
  const { id: userId } = req.params
  try {
    const data = await Users.findByPk(userId)
    res.send(data)
  } catch (err) {
    console.log(err.message)
    res.send([])
  }
})

module.exports = router
