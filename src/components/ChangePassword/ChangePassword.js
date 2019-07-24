import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { changePassword } from '../../api/auth'
import { withSnackbar } from 'notistack'
import messages from '../AutoDismissAlert/messages'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import FormTextField from '../Shared/FormTextField'

// Functional Component
function ChangePassword (props) {
  const [open, setOpen] = useState(props.open)
  const [credentials, setCredentials] = useState({ oldPassword: '', newPassword: '' })

  const handleClose = () => {
    const { history } = props
    setOpen(false)
    history.push('/home')
  }

  const handleChange = event => {
    event.persist()
    setCredentials(credentials => ({ ...credentials, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { enqueueSnackbar, history, user } = props

    changePassword(credentials, user)
      .then(() => enqueueSnackbar(messages.changePasswordSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        setCredentials({ oldPassword: '', newPassword: '' })
        enqueueSnackbar(messages.changePasswordFailure, { variant: 'error' })
      })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <form noValidate>
            <FormTextField
              handleChangeFunction={handleChange}
              setValue={credentials.oldPassword}
              setLabel={'Old Password'}
              setID={'oldPassword'}
            />
            <FormTextField
              handleChangeFunction={handleChange}
              setValue={credentials.newPassword}
              setLabel={'New Password'}
              setID={'newPassword'}
            />
            <Button
              fullWidth
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
            >
              Change
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withSnackbar(withRouter(ChangePassword))
