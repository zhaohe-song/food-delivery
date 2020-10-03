const authUser = User => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(403).json({ message: 'Forbidden' })
    } else {
      next()
    }
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = authUser