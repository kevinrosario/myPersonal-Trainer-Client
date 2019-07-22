import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { signIn } from '../../api/auth'
import { makeStyles } from '@material-ui/core/styles'
import messages from '../AutoDismissAlert/messages'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginTop: 20
  },
  menu: {
    width: 200
  }
}))
function SignIn (props) {
  const classes = useStyles()
  const [open, setOpen] = useState(props.open)
  const [credentials, setCredentials] = useState({ email: '', password: '' })

  function handleClose () {
    const { history } = props
    setOpen(false)
    history.push('/')
  }

  const handleChange = event => {
    event.persist()
    setCredentials(credentials => ({ ...credentials, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    const { enqueueSnackbar, history, setUser } = props

    signIn(credentials)
      .then(res => setUser(res.data.user))
      .then(() => enqueueSnackbar(messages.signInSuccess, { variant: 'success' }))
      .then(() => history.push('/'))
      .then(handleClose)
      .catch(error => {
        console.error(error)
        enqueueSnackbar(messages.signInFailure, { variant: 'error' })
      })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign-In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email and password to access features!
          </DialogContentText>
          <TextField
            className={classes.textField}
            required
            autoFocus
            id="name"
            label="Email Address"
            type="email"
            name="email"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            className={classes.textField}
            required
            id="password"
            label="Password"
            type="password"
            name="password"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Sign-In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

// <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//   Open form dialog
// </Button>

// class SignIn extends Component {
//   constructor () {
//     super()
//
//     this.state = {
//       email: '',
//       password: ''
//     }
//   }
//
//   handleChange = event => this.setState({
//     [event.target.name]: event.target.value
//   })
//

//
//   render () {
//     const { email, password } = this.state
//
//     return (
//       <div className="row">
//         <div className="col-sm-10 col-md-8 mx-auto mt-5">
//           <h3>Sign In</h3>
//           <Form onSubmit={this.onSignIn}>
//             <Form.Group controlId="email">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 required
//                 type="email"
//                 name="email"
//                 value={email}
//                 placeholder="Enter email"
//                 onChange={this.handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 required
//                 name="password"
//                 value={password}
//                 type="password"
//                 placeholder="Password"
//                 onChange={this.handleChange}
//               />
//             </Form.Group>
//             <Button
//               variant="primary"
//               type="submit"
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     )
//   }
// }

export default withSnackbar(withRouter(SignIn))
