const express = require('express')
const findOrder = require('../controller/findOrder')
const Order = require('../models/Order')
const router = express.Router()

router.get('/', findOrder('driver'))

router.post('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    order.driver = req.user.id
    order.save()
    res.json(order)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router