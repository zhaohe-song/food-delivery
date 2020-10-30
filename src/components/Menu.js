import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRestaurantItems, addCustomerOrder, addItemToCart, deleteItemFromCart, emptyCart } from '../actions/customer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import Drawer from '@material-ui/core/Drawer'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

const Item = ({ item, setIsDialogOpen, setCurrentItem }) => {
  function handleClick() {
    setIsDialogOpen(true)
    setCurrentItem(item)
  }
  return (
    <Grid item xs={4} sm={3} md={2}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            image={item.image}
            style={{ height: 120 }}
          />
          <Typography variant="body2" color="textSecondary">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ${item.price}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

const TabPanel = ({ value, index, items, setIsDialogOpen, setCurrentItem }) => {
  return (
    <div
      hidden={value !== index}
    >
      <Grid container spacing={1}>
        {items.map(item =>
          <Item
            key={item._id}
            item={item}
            setIsDialogOpen={setIsDialogOpen}
            setCurrentItem={setCurrentItem}
          />
        )}
      </Grid>
    </div>
  )
}

const Menu = ({ match, isAuthenticated, restaurants, items, orders, cart, getRestaurantItems, addCustomerOrder, addItemToCart, deleteItemFromCart, emptyCart }) => {
  const restaurantID = match.params.id
  const restaurant = restaurants.filter(restaurant => restaurant._id === restaurantID)[0]
  const thisCart = cart.filter(item => item.restaurantID === restaurantID)

  const [value, setValue] = useState(0)
  const [categories, setCategories] = useState([])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState({})
  const [size, setSize] = useState('normal')
  const [amount, setAmount] = useState(1)
  const [notes, setNotes] = useState('')

  const [type, setType] = useState('delivery')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    getRestaurantItems(restaurantID)
  }, [])

  useEffect(() => {
    setCategories([...new Set(items.map(item => item.category.toUpperCase()))])
  }, [items])

  function handleDialogClose() {
    setIsDialogOpen(false)
    setSize('normal')
    setAmount(1)
    setNotes('')
  }

  function handleAddToCart() {
    const id = uuid()
    const price = size === 'normal' ?
      (currentItem.price * amount).toFixed(2) :
      (size === 'small' ? (currentItem.price * 0.75 * amount).toFixed(2) : (currentItem.price * 1.25 * amount).toFixed(2))
    addItemToCart(id, restaurantID, currentItem._id, currentItem.name, price, size, amount, notes)
    setIsDialogOpen(false)
    setIsDrawerOpen(true)
    setSize('normal')
    setAmount(1)
    setNotes('')
  }

  function handleAddCustomerOrder() {
    if (thisCart.length === 0) {
      toast.warning("You haven't order anything yet")
      return
    }
    const orderDetail = thisCart.map(each => ({
      item: each.item,
      size: each.size,
      amount: each.amount,
      notes: each.notes
    }))
    addCustomerOrder(restaurantID, type, orderDetail)
    setIsDrawerOpen(false)
    emptyCart()
  }

  if (!isAuthenticated) {
    const token = localStorage.getItem('token')
    if (!token) {
      return <Redirect to="/login" />
    }
  }

  return (
    <div style={{ marginTop: 16 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} textColor="primary" indicatorColor="primary" variant="scrollable" >
            {categories.map(category => <Tab key={category} label={category} />)}
          </Tabs>
          <IconButton onClick={() => setIsDrawerOpen(true)} style={{ marginLeft: 'auto' }}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {categories.map((category, index) =>
        <TabPanel
          key={category}
          value={value}
          index={index}
          items={items.filter(item => item.category.toUpperCase() === category)}
          setIsDialogOpen={setIsDialogOpen}
          setCurrentItem={setCurrentItem}
        />
      )}

      <Drawer open={isDrawerOpen} variant="persistent" anchor="right">
        <IconButton edge="end" onClick={() => setIsDrawerOpen(false)}>
          <ChevronRightIcon />
        </IconButton>
        <Divider />
        <Typography style={{ margin: 5 }}>Your Order</Typography>
        <Typography style={{ margin: 5 }} color="secondary">{restaurant && restaurant.username}</Typography>
        <Button variant="contained" color="primary" onClick={() => setType(prev => prev === 'delivery' ? 'carryout' : 'delivery')} style={{ margin: 5, minHeight: 30 }}>
          {type}
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddCustomerOrder} style={{ margin: 5, minHeight: 30 }}>
          <div>Checkout</div>
          <div style={{ marginLeft: 'auto' }}>
            {thisCart.length === 0 ? '' :
              (thisCart.length === 1 ? ('$' + thisCart[0].price) : ('$' + thisCart.reduce((prev, next) => prev + parseFloat(next.price), 0).toFixed(2)))}
          </div>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => { emptyCart(); setIsDrawerOpen(false) }} style={{ margin: 5, minHeight: 30 }}>
          Empty Cart
        </Button>
        <Divider />
        <List style={{ width: 300 }}>
          {thisCart.map(item => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.amount} ${item.name} $${item.price}`}
                secondary={`${item.size} ${item.notes}`}
              />
              <ListItemSecondaryAction style={{ marginLeft: 20 }}>
                <IconButton onClick={() => deleteItemFromCart(item.id)} style={{ marginLeft: 'auto' }}>
                  <DeleteForeverTwoToneIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <Box p={2} display="flex" flexDirection="column" style={{ width: 300 }}>
          <img
            src={currentItem.image}
            alt=""
            style={{ marginBottom: 10, height: 180 }}
          />
          <Typography color="primary">
            {currentItem.name} {' '}
            ${size === 'normal' ? (currentItem.price * amount).toFixed(2) :
              (size === 'small' ? (currentItem.price * 0.75 * amount).toFixed(2) : (currentItem.price * 1.25 * amount).toFixed(2))}
          </Typography>
          <Box display="flex" my={1}>
            <FormControl color="primary" variant="filled" style={{ width: 120 }}>
              <InputLabel id="size">Package Size</InputLabel>
              <Select labelId="size" value={size} onChange={e => setSize(e.target.value)}>
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
            <div style={{ marginLeft: 'auto' }}>
              Amount
              <IconButton onClick={() => { if (amount > 1) setAmount(prev => prev - 1) }}>
                <RemoveIcon />
              </IconButton>
              {amount}
              <IconButton onClick={() => setAmount(prev => prev + 1)}>
                <AddIcon />
              </IconButton>
            </div>
          </Box>
          <TextField
            multiline
            variant="outlined"
            label="Any special requirement?"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to your order</Button>
            <Button color="primary" onClick={handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Typography variant="h6" style={{ marginTop: 16 }}>
        {orders.filter(order => order.restaurant._id === restaurantID).length ? 'Order History' : ''}
      </Typography>
      {orders.filter(order => order.restaurant._id === restaurantID).map(order => (
        <Accordion key={order._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: 'SlateBlue' }}>
              {order.restaurant.username} {' '}
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
                {detail.amount} {detail.size} {detail.item.name} {detail.notes} {' '}
                ${detail.size === 'normal' ? detail.item.price * detail.amount :
                  (detail.size === 'small' ? (detail.item.price * 0.75 * detail.amount).toFixed(2) : (detail.item.price * 1.25 * detail.amount).toFixed(2))
                }
              </Typography>
            ))}
            <Button
              variant="contained"
              style={{ color: 'whitesmoke', background: 'SlateBlue' }}
              onClick={() => {
                const orderDetail = order.orderDetail.map(detail => ({
                  item: detail.item._id,
                  size: detail.size,
                  amount: detail.amount,
                  notes: detail.notes
                }))
                addCustomerOrder(restaurantID, order.type, orderDetail)
              }}
            >
              Order this again!
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

Menu.propTypes = {
  restaurants: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  restaurants: state.customer.restaurants,
  items: state.customer.items,
  orders: state.customer.orders,
  cart: state.customer.cart
})

export default connect(mapStateToProps, { getRestaurantItems, addCustomerOrder, addItemToCart, deleteItemFromCart, emptyCart })(Menu)
