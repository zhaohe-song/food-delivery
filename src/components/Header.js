import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Header = props => {
  return (
    <div>
      Header
      <ul>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/">Dashboard</Link>
      </ul>
    </div>
  )
}

Header.propTypes = {

}

export default Header
