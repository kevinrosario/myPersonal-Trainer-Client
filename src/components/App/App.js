import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  render () {
    const { user } = this.state

    return (
      <SnackbarProvider>
        <Header user={user} />
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn open={true} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword user={user} />
          )} />
        </main>
      </SnackbarProvider>
    )
  }
}

export default App
