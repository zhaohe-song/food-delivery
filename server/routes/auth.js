const express = require('express')
const chalk = require('chalk')
const Restaurant = require('../models/Restaurant')
const Driver = require('../models/Driver')
const Customer = require('../models/Customer')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    let user = await Customer.findById(req.user.id).select('-password')
    if (user) {
      res.json({ user, usertype: 'customer' })
    } else {
      user = await Driver.findById(req.user.id).select('-password')
      if (user) {
        res.json({ user, usertype: 'driver' })
      } else {
        user = await Restaurant.findById(req.user.id).select('-password')
        if (user) {
          res.json({ user, usertype: 'restaurant' })
        } else {
          res.status(400).json({ message: 'Invalid token' })
        }
      }
    }
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router