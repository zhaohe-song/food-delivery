const Restaurant = require('../models/Restaurant')
const express = require('express')
const router = express.Router()
const { register, login } = require('../controller/user')
const auth = require('../middleware/auth')
const chalk = require('chalk')

router.post('/register', register(Restaurant))

router.post('/login', login(Restaurant))

router.put('/', auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user.id)
    restaurant.image = req.body.image
    await restaurant.save()
    res.json(restaurant)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router