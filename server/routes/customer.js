const Customer = require('../models/Customer')
const express = require('express')
const router = express.Router()
const { register, login } = require('../controller/user')

router.post('/register', register(Customer))

router.post('/login', login(Customer))

module.exports = router