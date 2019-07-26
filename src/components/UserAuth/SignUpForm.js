import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormTextField from '../Shared/FormTextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'

// Functional Component
const SignUpForm = props => {
  const { handleChange, handleSubmit, handleForms, makeStyles } = props
  const { email, password, passwordConfirmation } = props.credentials
  const classes = makeStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <FormTextField
            handleChangeFunction={handleChange}
            setValue={email}
            setLabel={'Email'}
            setID={'email'}
          />
          <FormTextField
            handleChangeFunction={handleChange}
            setValue={password}
            setLabel={'Password'}
            setID={'password'}
          />
          <FormTextField
            handleChangeFunction={handleChange}
            setValue={passwordConfirmation}
            setLabel={'Password'}
            setID={'passwordConfirmation'}
          />
          <Button
            fullWidth
            onClick={handleSubmit}
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href={'javascript:;'} onClick={handleForms} variant="body2">
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default SignUpForm
