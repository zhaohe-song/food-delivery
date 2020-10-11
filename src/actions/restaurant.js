import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, GET_RESTAURANT_ORDERS, ADD_RESTAURANT_ORDER } from './types'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getItems = () => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.get('/item', config)
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const addItem = (category, name, price, image) => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.post('/item', { category, name, price, image }, config)
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  } catch (err) {
    toast.error(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const editItem = (id, name, price, image) => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.put(`/item/${id}`, { name, price, image }, config)
    dispatch({
      type: EDIT_ITEM,
      payload: res.data
    })
  } catch (err) {
    toast.error(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const deleteItem = id => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.delete(`/item/${id}`, config)
    dispatch({
      type: DELETE_ITEM,
      payload: res.data._id
    })
  } catch (err) {
    toast.error(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const getRestaurantOrders = () => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.get('/restaurantorder', config)
    dispatch({
      type: GET_RESTAURANT_ORDERS,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const addRestaurantOrder = order => dispatch => {
  try {
    dispatch({
      type: ADD_RESTAURANT_ORDER,
      payload: order
    })
  } catch (err) {
    console.error(err)
  }
}