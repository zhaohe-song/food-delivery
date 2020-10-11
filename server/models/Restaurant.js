const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  register_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = Restaurant = mongoose.model('Restaurant', RestaurantSchema)