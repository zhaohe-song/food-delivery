import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_SUCCESS, AUTH_FAIL, LOGOUT_SUCCESS } from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  usertype: '',
  isAuthenticated: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        usertype: action.payload.usertype,
        isAuthenticated: true
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        usertype: '',
        isAuthenticated: false
      }
    default:
      return state
  }
}
