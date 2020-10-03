const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  create_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = Item = mongoose.model('Item', ItemSchema)