const Customer = require('../models/Customer')
const authUser = require('../controller/authUser')

const authCustomer = authUser(Customer)

module.exports = authCustomer