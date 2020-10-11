const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const orders = await Order
      .find({ 'restaurant': req.user.id })
      .populate('customer', 'username')
      .populate('orderDetail.item', 'name price')
      .sort('-create_at').lean()
    res.json(orders)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router