import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../actions/user'
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

const Register = ({ isAuthenticated, registerUser }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usertype, setUsertype] = useState('')

  function handleRegister(e) {
    e.preventDefault()
    if (!username || !email || !password || !usertype) {
      toast.warning('Please input all fields')
      return
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.warning('Invalid email')
      return
    }
    registerUser(username, email, password, usertype)
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Container maxWidth="xs">
      <Box mt={5} display="flex" flexDirection="column" alignItems="center">
        <Avatar style={{ background: '#f30' }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5" style={{ margin: '16px 0' }}>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField label="Username" fullWidth variant="outlined" value={username} onChange={e => setUsername(e.target.value)} />
          <TextField label="Email" fullWidth variant="outlined" value={email} onChange={e => setEmail(e.target.value)} style={{ margin: '16px 0' }} />
          <TextField type="password" label="Password" fullWidth variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
          <FormControl variant="outlined" fullWidth style={{ margin: '16px 0' }}>
            <InputLabel id="usertype">Choose your user type</InputLabel>
            <Select labelId="usertype" label="Choose your user type" value={usertype} onChange={e => setUsertype(e.target.value)}>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="driver">Driver</MenuItem>
              <MenuItem value="restaurant">Restaurant</MenuItem>
            </Select>
          </FormControl>
          <Button type="button" fullWidth variant="contained" color="primary" onClick={handleRegister}>Register</Button>
          <Link component={RouterLink} to="/login" style={{ float: 'right', marginTop: 16 }}>
            Already have an account? Login
          </Link>
        </form>
      </Box>
    </Container>
  )
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, { registerUser })(Register)
