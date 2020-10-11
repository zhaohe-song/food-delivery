import { GET_RESTAURANTS, GET_RESTAURANT_ITEMS, GET_CUSTOMER_ORDERS, ADD_CUSTOMER_ORDER, ADD_ITEM_TO_CART, DELETE_ITEM_FROM_CART, EMPTY_CART } from '../actions/types'

const initialState = {
  restaurants: [],
  items: [],
  orders: [],
  cart: JSON.parse(localStorage.getItem('cart')) || []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case GET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload
      }
    case GET_RESTAURANT_ITEMS:
      return {
        ...state,
        items: action.payload
      }
    case GET_CUSTOMER_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case ADD_CUSTOMER_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      }
    case ADD_ITEM_TO_CART: {
      const cart = [...state.cart, action.payload]
      localStorage.setItem('cart', JSON.stringify(cart))
      return { ...state, cart }
    }
    case DELETE_ITEM_FROM_CART: {
      const cart = state.cart.filter(item => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(cart))
      return { ...state, cart }
    }
    case EMPTY_CART:
      localStorage.removeItem('cart')
      return { ...state, cart: [] }
    default:
      return state
  }
}
