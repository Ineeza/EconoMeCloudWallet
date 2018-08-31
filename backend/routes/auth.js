const express = require('express')
const router = express.Router()

router.get('/signup', (req, res, next) => {
  res.json({
    status : '/signup'
  })
})

router.get('/login', (req, res, next) => {
  res.json({
    status : '/login'
  })
})

module.exports = router
