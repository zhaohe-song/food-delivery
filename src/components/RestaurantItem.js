import React, { useState } from 'react'
import { connect } from 'react-redux'
import { editItem, deleteItem } from '../actions/restaurant'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import DialogActions from '@material-ui/core/DialogActions'
import { toast } from 'react-toastify'

const RestaurantItem = ({ item, editItem, deleteItem }) => {
  const id = item._id
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)
  const [image, setImage] = useState(item.image)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  function handleEditItem() {
    if (!name || !price || !image) {
      toast.warning('Please input all the field')
      return
    }
    if (isNaN(price)) {
      toast.warning('The price has to be a number')
      return
    }
    editItem(id, name, price, image)
    setEditDialogOpen(false)
  }
  return (
    <Grid item xs={4} sm={3} md={2}>
      <Card>
        <CardMedia
          image={item.image}
          style={{ height: 130 }}
        />
        <Typography variant="body2" color="textSecondary">
          {item.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ${item.price}
        </Typography>
        <CardActions>
          <Tooltip title="Edit this item">
            <IconButton onClick={() => setEditDialogOpen(true)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete this item">
            <IconButton onClick={() => setDeleteDialogOpen(true)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} >
        <Box p={2} display="flex" flexDirection="column" style={{ width: 300 }}>
          <img
            src={image}
            alt=""
            style={{ marginBottom: 10, height: 200 }}
          />
          <TextField
            autoFocus
            variant="outlined"
            label="Enter new item name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Enter the price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            style={{ margin: '10px 0' }}
          />
          <TextField
            variant="outlined"
            label="Enter the image url"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
          <DialogActions>
            <Button color="primary" onClick={handleEditItem}>Edit it</Button>
            <Button color="primary" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>
          Are you sure to delete this item?
        </DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={() => { deleteItem(id); setDeleteDialogOpen(false) }}>Delete it</Button>
          <Button color="primary" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default connect(null, { editItem, deleteItem })(RestaurantItem)
