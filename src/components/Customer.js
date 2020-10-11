import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addCustomerOrder } from '../actions/customer'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'

const Restaurant = ({ restaurant }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea component={Link} to={`/${restaurant._id}/menu`}>
          <CardMedia
            image={restaurant.image}
            style={{ height: 250 }}
          />
          <CardContent>
            <Typography>
              {restaurant.username}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

const Customer = ({ restaurants, orders, addCustomerOrder }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Grid container spacing={2}>
        {restaurants.map(restaurant => <Restaurant key={restaurant._id} restaurant={restaurant} />)}
      </Grid>

      <Typography variant="h6" style={{ marginTop: 16 }}>
        {orders.length ? 'Order History' : ''}
      </Typography>

      {orders.map(order => (
        <Accordion key={order._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: 'SlateBlue' }}>
              {order.restaurant.username} {' '}
              ${order.orderDetail.reduce((prev, next) =>{
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
            <Button
              variant="contained"
              style={{ color: 'whitesmoke', background: 'SlateBlue' }}
              onClick={() => {
                const restaurantID = order.restaurant._id
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
    </>
  )
}

Customer.propTypes = {
  restaurants: PropTypes.array.isRequired,
  orders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  restaurants: state.customer.restaurants,
  orders: state.customer.orders
})

export default connect(mapStateToProps, { addCustomerOrder })(Customer)
