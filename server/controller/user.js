const chalk = require('chalk')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = User => async (req, res) => {
  let { username, email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'Email has already been registered' })
    }
    password = await bcrypt.hash(password, 10)
    const newUser = await User.create({username, email, password})
    jwt.sign(
      {id: newUser.id},
      process.env.JWTSECRET,
      (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: {
            _id: newUser.id,
            username: newUser.username,
            email: newUser.email
          }
        })
      }
    )
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

exports.login = User => async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User doesn\'t exist' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({ message: 'Wrong password' })
    }
    jwt.sign(
      { id: user.id },
      process.env.JWTSECRET,
      (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: {
            _id: user.id,
            username: user.username,
            email: user.email
          }
        })
      }
    )
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}