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
  orderDetail: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    size: {
      type: String,
      default: 'normal',
      enum: ['small', 'normal', 'large']
    },
    amount: {
      type: Number,
      default: 1
    },
    notes: {
      type: String
    }
  }],
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = Order = mongoose.model('Order', OrderSchema)