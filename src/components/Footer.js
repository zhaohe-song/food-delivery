import React from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const Footer = () => {
  return (
    <Box mt={8}>
      <Typography align="center" color="textSecondary" variant="body2">
        {'Copyright © Food Delivery '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  )
}

export default Footer
