const express = require('express')
const Order = require('../models/Order')
const router = express.Router()

// orders that haven't been take by drivers in the last 10 mins
router.get('/untaken', async (req, res) => {
  try {
    const orders = await Order
      .find({ type: 'delivery', driver: null, create_at: {$gt: Date.now() - 600000 } })
      .populate('customer', 'username')
      .populate('restaurant', 'username')
      .populate('orderDetail.item', 'name price')
      .sort('-create_at').lean()
    res.json(orders)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const orders = await Order
      .find({ 'driver': req.user.id })
      .populate('customer', 'username')
      .populate('restaurant', 'username')
      .populate('orderDetail.item', 'name price')
      .sort('-create_at').lean()
    res.json(orders)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const order = await Order
      .findById(req.params.id)
      .populate('customer', 'username')
      .populate('restaurant', 'username')
      .populate('orderDetail.item', 'name price')
    order.driver = req.user.id
    await order.save()
    res.json(order)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router