import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_SUCCESS, AUTH_FAIL, LOGOUT_SUCCESS } from './types'
import axios from 'axios'
import { toast } from 'react-toastify'

export const registerUser = (username, email, password, usertype) => async dispatch => {
  try {
    const res = await axios.post(`/${usertype}/register`, { username, email, password })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { ...res.data, usertype }
    })
    toast.info(`Welcome ${res.data.user.username}`)
  } catch (err) {
    dispatch({ type: REGISTER_FAIL })
    toast.error(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const loginUser = (email, password, usertype) => async dispatch => {
  try {
    const res = await axios.post(`/${usertype}/login`, { email, password })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { ...res.data, usertype }
    })
    toast.info(`Welcome ${res.data.user.username}`)
  } catch (err) {
    dispatch({ type: LOGIN_FAIL })
    toast.error(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const authUser = () => async (dispatch, getState) => {
  const config = {
    headers: { 'food-auth-token': getState().user.token }
  }

  try {
    const res = await axios.get('/auth', config)
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    })
    toast.info(`Welcome ${res.data.user.username}`)
  } catch (err) {
    dispatch({ type: AUTH_FAIL })
    console.error(err)
  }
}

export const logoutUser = () => (dispatch, getState) => {
  toast(`Goodbye ${getState().user.user.username}`)
  dispatch({ type: LOGOUT_SUCCESS })
}
