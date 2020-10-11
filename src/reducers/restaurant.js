import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, GET_RESTAURANT_ORDERS, ADD_RESTAURANT_ORDER } from '../actions/types'

const initialState = {
  items: [],
  orders: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map(item => {
          if (item._id === action.payload._id) {
            return action.payload
          }
          return item
        })
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      }
    case GET_RESTAURANT_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case ADD_RESTAURANT_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      }
    default:
      return state
  }
}
