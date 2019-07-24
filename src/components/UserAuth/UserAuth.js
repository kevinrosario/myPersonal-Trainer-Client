import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { signIn, signUp } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

// Functional Component
function UserAuth (props) {
  const [open, setOpen] = useState(props.open)
  const [signUpForm, setSignUpForm] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '', passwordConfirmation: '' })

  const handleForms = () => {
    setSignUpForm(!signUpForm)
  }

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
    const { enqueueSnackbar, setUser } = props

    if (!signUpForm) {
      signIn(credentials)
        .then(res => setUser(res.data.user))
        .then(() => enqueueSnackbar(messages.signInSuccess, { variant: 'success' }))
        .then(handleClose)
        .catch(error => {
          console.error(error)
          setCredentials({ email: '', password: '', passwordConfirmation: '' })
          enqueueSnackbar(messages.signInFailure, { variant: 'error' })
        })
    } else {
      signUp(credentials)
        .then(() => signIn(credentials))
        .then(res => setUser(res.data.user))
        .then(() => enqueueSnackbar(messages.signUpSuccess, { variant: 'success' }))
        .then(handleClose)
        .catch(error => {
          console.error(error)
          setCredentials({ email: '', password: '', passwordConfirmation: '' })
          enqueueSnackbar(messages.signUpFailure, { variant: 'error' })
        })
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          {!signUpForm
            ? <SignInForm handleForms={handleForms} credentials={credentials} handleSubmit={handleSubmit} handleChange={handleChange} />
            : <SignUpForm handleForms={handleForms} credentials={credentials} handleSubmit={handleSubmit} handleChange={handleChange} />}
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

export default withSnackbar(withRouter(UserAuth))
