const express = require('express')
const Restaurant = require('../models/Restaurant')
const Item = require('../models/Item')
const chalk = require('chalk')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().select('-password').lean()
    res.json(restaurants)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

router.get('/:id/menu', async (req, res) => {
  try {
    const items = await Item.find({ restaurant: req.params.id }).lean()
    res.json(items)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router