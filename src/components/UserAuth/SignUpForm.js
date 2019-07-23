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
import { makeStyles } from '@material-ui/core/styles'

// Styling
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

// Functional Component
const SignUpForm = props => {
  const classes = useStyles()
  const { email, password, passwordConfirmation } = props.credentials
  const { handleChange, handleSubmit, handleForms } = props
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
