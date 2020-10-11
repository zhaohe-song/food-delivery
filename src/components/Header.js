import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/user'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import store from '../store'

const Header = ({ isAuthenticated, usertype, logoutUser }) => {
  const [imageUploadOpen, setImageUploadOpen] = useState(false)
  const [image, setImage] = useState('')

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" component={RouterLink} to="/">
          <HomeIcon />
        </IconButton>
        <Typography>
          Food Delivery
        </Typography>
        {
          isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => logoutUser()} style={{ marginLeft: 'auto' }}>
                Logout
              </Button>
              {
                usertype === 'restaurant' &&
                <>
                  <IconButton color="inherit" onClick={() => setImageUploadOpen(true)}>
                    <AccountCircleIcon />
                  </IconButton>
                  <Dialog fullWidth open={imageUploadOpen} onClose={() => setImageUploadOpen(false)}>
                    <Box p={2} display="flex" flexDirection="column">
                      <img
                        src={image}
                        alt=""
                        style={{ marginBottom: 10, maxHeight: 400 }}
                      />
                      <TextField
                        label="Enter the restaurant image url"
                        variant="outlined"
                        value={image}
                        onChange={e => setImage(e.target.value)}
                      />
                      <DialogActions>
                        <Button color="primary" variant="contained" onClick={() => {
                          const config = {
                            headers: { 'food-auth-token': store.getState().user.token }
                          }
                          axios.put('/restaurant', { image }, config)
                          setImageUploadOpen(false)
                        }} > Confirm </Button>
                        <Button color="primary" variant="outlined" onClick={() => setImageUploadOpen(false)}>Cancel</Button>
                      </DialogActions>
                    </Box>
                  </Dialog>
                </>
              }
            </>
          ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/register" style={{ marginLeft: 'auto' }}>
                  Register
              </Button>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login
              </Button>
              </>
            )
        }
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  usertype: state.user.usertype
})

export default connect(mapStateToProps, { logoutUser })(Header)
