const express = require('express')
const findOrder = require('../controller/findOrder')
const router = express.Router()

router.get('/', findOrder('restaurant'))

module.exports = router