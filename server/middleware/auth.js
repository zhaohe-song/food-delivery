const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.header('food-auth-token')
  if (token === 'null') {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }
  try {
    req.user = jwt.verify(token, process.env.JWTSECRET)
    next()
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' })
  }
}

module.exports = auth