const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
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
  register_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = Customer = mongoose.model('Customer', CustomerSchema)