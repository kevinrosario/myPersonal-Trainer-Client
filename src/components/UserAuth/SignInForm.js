import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormTextField from '../Shared/FormTextField'

// Functional Component
const SignInForm = props => {
  const { email, password } = props.credentials
  const { handleChange, handleSubmit, handleForms, makeStyles } = props
  const classes = makeStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
          <Button
            fullWidth
            onClick={handleSubmit}
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href={'javascript:;'} onClick={handleForms} variant="body2">
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default SignInForm
