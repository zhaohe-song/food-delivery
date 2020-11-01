import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import store from './store'
import { authUser } from './actions/user'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Container from '@material-ui/core/Container'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getRestaurants, getCustomerOrders } from './actions/customer'

const App = ({ user, getRestaurants, getCustomerOrders }) => {
  useEffect(() => {
    store.dispatch(authUser())
  }, [])

  useEffect(() => {
    getRestaurants()
    getCustomerOrders()
  }, [user])

  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/register" children={<Register />} />
          <Route exact path="/login" children={<Login />} />
          <Route exact path="/" children={<Dashboard />} />
          <Route exact path="/:id/menu" children={<Menu />} />
          <Redirect to="/" />
        </Switch>
      </Container>
      <Footer />
      <ToastContainer autoClose={2000} position="top-center" />
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
  user: state.user.token
})

export default connect(mapStateToProps, { getRestaurants, getCustomerOrders })(App)
