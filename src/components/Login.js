import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/user'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import LockOutlined from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = ({ isAuthenticated, loginUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usertype, setUsertype] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (!email || !password || !usertype) {
      toast.warning('Please input all fields')
      return
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.warning('Invalid email')
      return
    }
    loginUser(email, password, usertype)
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Container maxWidth="xs">
      <Box mt={5} display="flex" flexDirection="column" alignItems="center" >
        <Avatar style={{ background: '#f30' }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5" style={{ margin: '16px 0' }}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField label="Email" fullWidth variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField type="password" label="Password" fullWidth variant="outlined" value={password} onChange={e => setPassword(e.target.value)} style={{ margin: '16px 0' }} />
          <FormControl variant="outlined" fullWidth style={{ margin: '0 0 16px 0' }}>
            <InputLabel id="usertype">Choose your user type</InputLabel>
            <Select labelId="usertype" label="Choose your user type" value={usertype} onChange={e => setUsertype(e.target.value)}>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="driver">Driver</MenuItem>
              <MenuItem value="restaurant">Restaurant</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleLogin}>Login</Button>
          <Link component={RouterLink} to="/register" style={{ float: 'right', marginTop: 16 }}>
            Don't have an account? Register
          </Link>
        </form>
      </Box>
    </Container>
  )
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(Login)
