import { GET_UNTAKEN_DRIVER_ORDERS, GET_DRIVER_ORDERS, ADD_DRIVER_ORDER } from './types'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getUntakenDriverOrders = () => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.get('/driverorder/untaken', config)
    dispatch({
      type: GET_UNTAKEN_DRIVER_ORDERS,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const getDriverOrders = () => async (dispatch, getState) => {
  const config = {
    headers: {'food-auth-token': getState().user.token}
  }

  try {
    const res = await axios.get('/driverorder', config)
    dispatch({
      type: GET_DRIVER_ORDERS,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const addDriverOrder = id => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.put(`/driverorder/${id}`, null, config)
    dispatch({
      type: ADD_DRIVER_ORDER,
      payload: res.data
    })
  } catch (err) {
    toast.error(`😥 ${err.response.data.message}`)
  }
}
