import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getItems, addItem, getRestaurantOrders } from '../actions/restaurant'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import DialogActions from '@material-ui/core/DialogActions'
import RestaurantItem from './RestaurantItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import { toast } from 'react-toastify'

const TabPanel = ({ value, index, items, setNewItemOpen }) => {
  return (
    <div
      hidden={value !== index}
    >
      <Grid container spacing={1}>
        {items.map(item =>
          <RestaurantItem
            key={item._id}
            item={item}
          />
        )}
        <Grid item xs="auto" style={{ marginTop: 60 }}>
          <Card>
            <Tooltip title="Add new item">
              <IconButton onClick={() => setNewItemOpen(true)}>
                <AddIcon style={{ fontSize: 60 }} />
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

const Restaurant = ({ items, orders, getItems, addItem, getRestaurantOrders }) => {
  const [categories, setCategories] = useState([])
  const [value, setValue] = useState(0)
  const [currentCategory, setCurrentCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newCategoryOpen, setNewCategoryOpen] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [newItemOpen, setNewItemOpen] = useState(false)

  useEffect(() => {
    getItems()
    getRestaurantOrders()
  }, [])

  useEffect(() => {
    setCategories([...new Set(items.map(item => item.category.toUpperCase()))])
  }, [items])

  useEffect(() => {
    setCurrentCategory(categories[value])
  }, [categories])

  function handleNewCategory(e) {
    e.preventDefault()
    if (newCategory.trim() === '') {
      toast.warning('Please input the new category')
      return
    }
    setCategories(prev => [...prev, newCategory])
    setValue(categories.length)
    setNewCategory('')
    setNewCategoryOpen(false)
  }

  function handleNewItem() {
    if (!name || !price || !image) {
      toast.warning('Please input all the field')
      return
    }
    if (isNaN(price)) {
      toast.warning('The price has to be a number')
      return
    }
    addItem(currentCategory, name, price, image)
    setNewItemOpen(false)
    setName('')
    setPrice('')
    setImage('')
  }

  return (
    <div style={{ marginTop: 16 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Tabs value={value} onChange={(e, newValue) => { setValue(newValue); setCurrentCategory(categories[newValue]) }} textColor="primary" indicatorColor="primary" variant="scrollable" >
            {categories.map(category => <Tab key={category} label={category} />)}
          </Tabs>
          <Tooltip title="Add new category">
            <IconButton color="inherit" style={{ marginLeft: 'auto' }} onClick={() => setNewCategoryOpen(true)}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {categories.map((category, index) =>
        <TabPanel
          key={category}
          value={value}
          index={index}
          items={items.filter(item => item.category.toUpperCase() === category)}
          setNewItemOpen={setNewItemOpen}
        />
      )}

      <Dialog open={newCategoryOpen} onClose={() => setNewCategoryOpen(false)}>
        <form onSubmit={handleNewCategory}>
          <TextField
            autoFocus
            label="Enter new category"
            variant="outlined"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            style={{ margin: 10 }}
          />
        </form>
      </Dialog>

      <Dialog open={newItemOpen} onClose={() => setNewItemOpen(false)} >
        <Box p={2} display="flex" flexDirection="column" style={{ width: 300 }}>
          <img
            src={image}
            alt=""
            style={{ marginBottom: 10, maxHeight: 200 }}
          />
          <TextField
            autoFocus
            variant="outlined"
            label="Enter new item name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Enter the price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            style={{ margin: '10px 0' }}
          />
          <TextField
            variant="outlined"
            label="Enter the image url"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <DialogActions>
            <Button color="primary" onClick={handleNewItem}>Add it</Button>
            <Button color="primary" onClick={() => setNewItemOpen(false)}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Typography variant="h6" style={{ marginTop: 16 }}>
        {orders.length ? 'Order History' : ''}
      </Typography>

      {orders.map(order => (
        <Accordion key={order._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: 'SlateBlue' }}>
              {order.customer.username} {' '}
              ${order.orderDetail.reduce((prev, next) => {
                if (next.size === 'normal') {
                  return prev + next.item.price * next.amount
                } else if (next.size === 'small') {
                  return prev + next.item.price * 0.75 * next.amount
                } else if (next.size === 'large') {
                  return prev + next.item.price * 1.25 * next.amount
                }
              }, 0).toFixed(2)}
            </Typography>
            <Typography style={{ marginLeft: 'auto', color: 'SlateBlue' }}>
              {order.type} on {new Date(order.create_at).toLocaleString()}
            </Typography>
          </AccordionSummary>

          <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
            {order.orderDetail.map(detail => (
              <Typography key={detail._id} variant="body2" color="textSecondary">
                {detail.amount} {detail.size} {detail.item.name} {detail.notes}
                ${detail.size === 'normal' ? detail.item.price * detail.amount :
                  (detail.size === 'small' ? (detail.item.price * 0.75 * detail.amount).toFixed(2) : (detail.item.price * 1.25 * detail.amount).toFixed(2))
                }
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

    </div>
  )
}

Restaurant.propTypes = {
  items: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  items: state.restaurant.items,
  orders: state.restaurant.orders
})

export default connect(mapStateToProps, { getItems, addItem, getRestaurantOrders })(Restaurant)
