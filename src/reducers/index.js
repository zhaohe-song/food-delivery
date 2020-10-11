import { combineReducers } from 'redux'
import user from './user'
import restaurant from './restaurant'
import customer from './customer'
import driver from './driver'

export default combineReducers({
  user,
  restaurant,
  customer,
  driver
})
