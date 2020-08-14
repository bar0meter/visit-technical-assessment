const express = require('express')
const multer = require('multer')
const router = express.Router()

const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'text/csv') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage, fileFilter })

router.post('/', upload.single('userSteps'), function (req, res) {
  const file = req.file
  if (!!file) {
    res.send('thank you for uploading')
  } else {
    res.send('error in uploading file. Check file format')
  }
})

module.exports = router
