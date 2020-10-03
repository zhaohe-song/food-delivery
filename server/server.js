const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

const connectDatabase = require('./database')
connectDatabase()

const express = require('express')
const path = require('path')
const chalk = require('chalk')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan')
  app.use(morgan('dev'))
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'build')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html')))
}

// user account API
app.use('/customer', require('./routes/customer'))
app.use('/driver', require('./routes/driver'))
app.use('/restaurant', require('./routes/restaurant'))

// business logic API
const auth = require('./middleware/auth')
const authRestaurant = require('./middleware/authRestaurant')
const authCustomer = require('./middleware/authCustomer')
const authDriver = require('./middleware/authDriver')
app.use('/item', auth, authRestaurant, require('./routes/item'))
app.use('/restaurants', auth, authCustomer, require('./routes/menu'))
app.use('/order', auth, authCustomer, require('./routes/order'))
app.use('/restaurantorder', auth, authRestaurant, require('./routes/restaurantOrder'))
app.use('/driverorder', auth, authDriver, require('./routes/driverOrder'))

const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT
server.listen(PORT, () => console.log(chalk.green((`server running in ${process.env.NODE_ENV} mode on port ${PORT}...`))))