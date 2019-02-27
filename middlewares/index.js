const express = require('express')
const router = express.Router()

const index = require('./functions')

// GET /
router.get('/', index.getHello)

module.exports = router
