import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import { signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

class SignOut extends Component {
  componentDidMount () {
    const { enqueueSnackbar, history, clearUser, user } = this.props

    signOut(user)
      .finally(() => enqueueSnackbar(messages.signOutSuccess, { variant: 'success' }))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withSnackbar(withRouter(SignOut))
