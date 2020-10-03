const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  type: {
    type: String,
    default: 'delivery',
    enum: ['delivery', 'carryout']
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  orderDetail: {
    type: Array,
    default: []
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = Order = mongoose.model('Order', OrderSchema)