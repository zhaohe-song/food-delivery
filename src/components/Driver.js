import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUntakenDriverOrders, getDriverOrders, addDriverOrder } from '../actions/driver'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'

const Driver = ({ untakenOrders, orders, getUntakenDriverOrders, getDriverOrders, addDriverOrder }) => {
  useEffect(() => {
    getUntakenDriverOrders()
    getDriverOrders()
  }, [])

  return (
    <>
      <Typography variant="h6" style={{ marginTop: 16 }}>
        {untakenOrders.length ? 'Untaken Orders in the last 10 mins' : ''}
      </Typography>
      {untakenOrders.map(order => (
        <Accordion key={order._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: 'MediumSeaGreen' }}>
              {order.customer.username}'s order from {' '}
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
            <Typography style={{ marginLeft: 'auto', color: 'MediumSeaGreen' }}>
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
            <Button style={{ background: 'MediumSeaGreen', color: 'whitesmoke' }} variant="contained" onClick={() => addDriverOrder(order._id)}>Deliver the order</Button>
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography variant="h6" style={{ marginTop: 16 }}>
        {orders.length ? 'Delivery History' : ''}
      </Typography>
      {orders.map(order => (
        <Accordion key={order._id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ color: 'SlateBlue' }}>
              {order.customer.username}'s order from {' '}
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
                {detail.amount} {detail.size} {detail.item.name} {detail.notes}
                ${detail.size === 'normal' ? detail.item.price * detail.amount :
                  (detail.size === 'small' ? (detail.item.price * 0.75 * detail.amount).toFixed(2) : (detail.item.price * 1.25 * detail.amount).toFixed(2))
                }
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}

Driver.propTypes = {
  orders: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  untakenOrders: state.driver.untakenOrders,
  orders: state.driver.orders
})

export default connect(mapStateToProps, { getUntakenDriverOrders, getDriverOrders, addDriverOrder })(Driver)
