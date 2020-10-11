import { GET_UNTAKEN_DRIVER_ORDERS, GET_DRIVER_ORDERS, ADD_DRIVER_ORDER } from '../actions/types'

const initalState = {
  untakenOrders: [],
  orders: []
}

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_UNTAKEN_DRIVER_ORDERS:
      return {
        ...state,
        untakenOrders: action.payload
      }
    case GET_DRIVER_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case ADD_DRIVER_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        untakenOrders: state.untakenOrders.filter(order => order._id !== action.payload._id)
      }
    default:
      return state
  }
}
