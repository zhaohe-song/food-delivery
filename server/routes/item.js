const express = require('express')
const Item = require('../models/Item')
const chalk = require('chalk')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const items = await Item.find({ restaurant: req.user.id }).lean()
    res.json(items)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

router.post('/', async (req, res) => {
  try {
    const item = await Item.create({
      name: req.body.name,
      restaurant: req.user.id,
      category: req.body.category,
      price: req.body.price,
      image: req.body.image
    })
    res.json(item)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    item.name = req.body.name
    item.price = req.body.price
    item.image = req.body.image
    await item.save()
    res.json(item)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id)
    res.json(item)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router