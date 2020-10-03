const Driver = require('../models/Driver')
const express = require('express')
const router = express.Router()
const { register, login } = require('../controller/user')

router.post('/register', register(Driver))

router.post('/login', login(Driver))

module.exports = router