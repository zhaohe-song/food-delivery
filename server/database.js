const mongoose = require('mongoose')
const chalk = require('chalk')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log(chalk.green(`MongoDB connected - host: ${connect.connection.host}; port: ${connect.connection.port}`))
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    process.exit(1)
  }
}

module.exports = connectDB