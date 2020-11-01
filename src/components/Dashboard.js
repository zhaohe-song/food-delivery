import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addDriverOrder } from '../actions/driver'
import { addRestaurantOrder } from '../actions/restaurant'
import { Redirect } from 'react-router-dom'
import Customer from './Customer'
import Driver from './Driver'
import Restaurant from './Restaurant'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'

const Dashboard = ({ isAuthenticated, usertype, user, addDriverOrder, addRestaurantOrder }) => {
  console.log('jiji')
  const [newOrder, setNewOrder] = useState(null)
  const [open, setOpen] = useState(false)

  function handleClose(event, reason) {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  useEffect(() => {
    if (newOrder) setOpen(true)
  }, [newOrder])

  if (isAuthenticated) {
    const ws = new WebSocket(`ws://${window.location.host}`)
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "socketID",
        usertype: usertype,
        socketID: user._id
      }))
    }
    ws.onmessage = message => {
      const data = JSON.parse(message.data)
      if (data.type === 'order') {
        setNewOrder(data.order)
      }
    }
  } else {
    return <Redirect to="/login" />
  }

  switch (usertype) {
    case 'customer':
      return <Customer />
    case 'driver':
      return (
        <>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={open}
            onClose={handleClose}
          >
            <SnackbarContent
              style={{ backgroundColor: 'MediumSeaGreen' }}
              message={newOrder &&
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: 'MediumSeaGreen' }}>
                      {newOrder.customer.username}'s order from {newOrder.restaurant.username} {' '}
                      ${newOrder.orderDetail.reduce((prev, next) => {
                        if (next.size === 'normal') {
                          return prev + next.item.price * next.amount
                        } else if (next.size === 'small') {
                          return prev + next.item.price * 0.75 * next.amount
                        } else if (next.size === 'large') {
                          return prev + next.item.price * 1.25 * next.amount
                        }
                      }, 0).toFixed(2)}
                    </Typography>
                    <Typography style={{ marginLeft: '100px', color: 'MediumSeaGreen' }}>
                      {newOrder.type} on {new Date(newOrder.create_at).toLocaleTimeString()}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                    {newOrder.orderDetail.map(detail => (
                      <Typography key={detail._id} variant="body2" color="textSecondary">
                        {detail.amount} {detail.size} {detail.item.name} {detail.notes} {' '}
                        ${detail.size === 'normal' ? detail.item.price * detail.amount :
                          (detail.size === 'small' ? (detail.item.price * 0.75 * detail.amount).toFixed(2) : (detail.item.price * 1.25 * detail.amount).toFixed(2))
                        }
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              }
              action={
                <>
                  <Button variant="outlined" color="inherit" onClick={() => { addDriverOrder(newOrder._id); setOpen(false) }}>
                    Take It!
                  </Button>
                  <IconButton color="inherit" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </>
              }
            />
          </Snackbar>
          <Driver />
        </>
      )
    case 'restaurant':
      return (
        <>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={open}
            onClose={handleClose}
          >
            <SnackbarContent
              style={{ backgroundColor: 'MediumSeaGreen' }}
              message={newOrder &&
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ color: 'MediumSeaGreen' }}>
                      {newOrder.customer.username} {' '}
                      ${newOrder.orderDetail.reduce((prev, next) => {
                        if (next.size === 'normal') {
                          return prev + next.item.price * next.amount
                        } else if (next.size === 'small') {
                          return prev + next.item.price * 0.75 * next.amount
                        } else if (next.size === 'large') {
                          return prev + next.item.price * 1.25 * next.amount
                        }
                      }, 0).toFixed(2)}
                    </Typography>
                    <Typography style={{ marginLeft: '100px', color: 'MediumSeaGreen' }}>
                      {newOrder.type} on {new Date(newOrder.create_at).toLocaleTimeString()}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
                    {newOrder.orderDetail.map(detail => (
                      <Typography key={detail._id} variant="body2" color="textSecondary">
                        {detail.amount} {detail.size} {detail.item.name} {detail.notes} {' '}
                        ${detail.size === 'normal' ? detail.item.price * detail.amount :
                          (detail.size === 'small' ? (detail.item.price * 0.75 * detail.amount).toFixed(2) : (detail.item.price * 1.25 * detail.amount).toFixed(2))
                        }
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              }
              action={
                <Button variant="outlined" color="inherit" onClick={() => { addRestaurantOrder(newOrder); setOpen(false) }}>
                  Take It!
                </Button>
              }
            />
          </Snackbar>
          <Restaurant />
        </>
      )
    default:
      return
  }
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  usertype: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  usertype: state.user.usertype,
  user: state.user.user
})

export default connect(mapStateToProps, { addDriverOrder, addRestaurantOrder })(Dashboard)
