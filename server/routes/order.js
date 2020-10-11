const express = require('express')
const Order = require('../models/Order')
const chalk = require('chalk')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const orders = await Order
      .find({ 'customer': req.user.id })
      .populate('restaurant', 'username')
      .populate('orderDetail.item', 'name price')
      .sort('-create_at').lean()
    res.json(orders)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

router.post('/', async (req, res) => {
  try {
    const order1 = await Order.create({
      customer: req.user.id,
      restaurant: req.body.restaurant,
      type: req.body.type,
      orderDetail: req.body.orderDetail
    })
    const order = await Order
      .findById(order1.id)
      .populate('customer', 'username')
      .populate('restaurant', 'username')
      .populate('orderDetail.item', 'name price')

    res.json(order)

    res.wss.clients.forEach(client => {
      if (client.readyState === 1) {
        if (client.usertype === 'restaurant' && client.socketID === order.restaurant.id) {
          client.send(JSON.stringify({
            order,
            type: 'order'
          }))
        }
        if (order.type === 'delivery') {
          if (client.usertype === 'driver') {
            client.send(JSON.stringify({
              order,
              type: 'order'
            }))
          }
        }
      }
    })
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router