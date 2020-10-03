const express = require('express')
const Order = require('../models/Order')
const findOrder = require('../controller/findOrder')
const chalk = require('chalk')

const router = express.Router()

router.get('/', findOrder('customer'))

router.post('/', async (req, res) => {
  try {
    const order = await Order.create({
      customer: req.user.id,
      restaurant: req.body.restaurant,
      type: req.body.type,
      orderDetail: req.body.orderDetail
    })
    res.json(order)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router