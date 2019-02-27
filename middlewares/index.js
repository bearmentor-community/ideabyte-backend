const express = require('express')
const router = express.Router()

const index = require('./controllers')

// GET /
router.get('/', index.getHello)

module.exports = router
