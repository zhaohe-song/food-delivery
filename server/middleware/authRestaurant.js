const Restaurant = require('../models/Restaurant')
const authUser = require('../controller/authUser')

const authRestaurant = authUser(Restaurant)

module.exports = authRestaurant