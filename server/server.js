const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

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

const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT
server.listen(PORT, () => console.log(chalk.green((`server running in ${process.env.NODE_ENV} mode on port ${PORT}...`))))