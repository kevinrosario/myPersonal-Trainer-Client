import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import Header from '../Header/Header'
import UserAuth from '../UserAuth/UserAuth'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import MainScreen from './../MainScreen/MainScreen'
import WorkoutTemplate from './../WorkoutTemplate/WorkoutTemplate'

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
          <Route path='/user-auth' render={() => (
            <UserAuth open={true} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword open={true} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-workout' render={() => (
            <WorkoutTemplate user={user} />
          )} />
          {user
            ? <AuthenticatedRoute user={user} exact path='/' render={() => (
              <MainScreen user={user} />
            )} /> : ''}
        </main>
      </SnackbarProvider>
    )
  }
}
// Debugging
// <Route user={user} path='/' render={() => (
//   <ExercisesDialog open={true} user={user} />
// )} />

export default App
