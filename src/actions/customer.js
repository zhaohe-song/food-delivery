import { GET_RESTAURANTS, GET_RESTAURANT_ITEMS, GET_CUSTOMER_ORDERS, ADD_CUSTOMER_ORDER, ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, EMPTY_CART } from './types'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getRestaurants = () => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.get('/restaurants', config)
    dispatch({
      type: GET_RESTAURANTS,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const getRestaurantItems = id => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.get(`/restaurants/${id}/menu`, config)
    dispatch({
      type: GET_RESTAURANT_ITEMS,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const getCustomerOrders = () => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.get('/order', config)
    dispatch({
      type: GET_CUSTOMER_ORDERS,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const addCustomerOrder = (restaurant, type, orderDetail) => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.post('/order', { restaurant, type, orderDetail }, config)
    dispatch({
      type: ADD_CUSTOMER_ORDER,
      payload: res.data
    })
  } catch (err) {
    toast.error(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const addItemToCart = (id, restaurantID, item, name, price, size, amount, notes) => dispatch => {
  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: {id, restaurantID, item, name, price, size, amount, notes }
  })
}

export const deleteItemFromCart = id => dispatch => {
  dispatch({
    type: DELETE_ITEM_FROM_CART,
    payload: id
  })
}

export const emptyCart = () => dispatch => {
  dispatch({ type: EMPTY_CART })
}
