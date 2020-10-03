const Driver = require('../models/Driver')
const authUser = require('../controller/authUser')

const authDriver = authUser(Driver)

module.exports = authDriver