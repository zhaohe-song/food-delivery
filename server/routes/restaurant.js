const Restaurant = require('../models/Restaurant')
const express = require('express')
const router = express.Router()
const { register, login } = require('../controller/user')

router.post('/register', register(Restaurant))

router.post('/login', login(Restaurant))

module.exports = router