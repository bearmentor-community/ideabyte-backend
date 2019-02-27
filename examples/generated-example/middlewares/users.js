const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.send({
    users: [
      {
        name: 'Alpha'
      },
      {
        name: 'Beta'
      }
    ]
  })
})

module.exports = router
