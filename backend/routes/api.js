const express = require('express')
const router = express.Router()

router.get('/tx', (req, res, next) => {
  res.json({
    status : '/tx'
  })
})

module.exports = router
