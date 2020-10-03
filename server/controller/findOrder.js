const Order = require('../models/Order')

const findOrder = user => async (req, res) => {
  try {
    const args = {}
    args[user] = req.user.id
    const orders = await Order.find(args).lean()
    res.json(orders)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = findOrder