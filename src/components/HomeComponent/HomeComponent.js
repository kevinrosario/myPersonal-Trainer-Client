import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

// Functional Component
function HomeComponent () {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h6">
        Welcome to myPersonal Trainer! With this App you can create your own
        workouts and keep track of the times you visited the gym. Also, you can
        use the built-in timer to rest between sets while working-out. In order
        to access this premium features you need to Sign-In or Sign-up using a
        fake email and password.
        </Typography>
      </Container>
    </Fragment>
  )
}

export default HomeComponent
