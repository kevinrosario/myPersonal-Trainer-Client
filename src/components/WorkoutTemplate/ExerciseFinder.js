import React, { useState } from 'react'
import { withSnackbar } from 'notistack'
import { getExercises } from '../../api/workout'
import { muscles, equipments, categories } from './apiConstants'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

// Styling
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

// Functional Component
function ExerciseFinder (props) {
  const classes = useStyles()
  const [parameters, setParameters] = useState({
    muscles: '',
    muscles_secondary: '',
    category: '',
    equipment: ''
  })

  const handleChange = name => event => {
    setParameters({
      ...parameters,
      [name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    getExercises(parameters)
      .then(response => props.setExerciseList(response.data.results))
      .catch(console.error)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        Find exercises
        </Typography>
        <form className={classes.form} noValidate>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="muscles">Primary Muscle</InputLabel>
            <Select
              native
              value={parameters.muscles}
              onChange={handleChange('muscles')}
              inputProps={{
                name: 'muscles',
                id: 'muscles'
              }}
            >
              <option value="" />
              {muscles.map((muscle) => (<option key={muscle.id} value={muscle.id}>{muscle.name}</option>))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="muscles_secondary">Secondary Muscle</InputLabel>
            <Select
              native
              value={parameters.muscles_secondary}
              onChange={handleChange('muscles_secondary')}
              inputProps={{
                name: 'muscles_secondary',
                id: 'muscles_secondary'
              }}
            >
              <option value="" />
              {muscles.map((muscle) => (<option key={muscle.id} value={muscle.id}>{muscle.name}</option>))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="categories">Categories</InputLabel>
            <Select
              native
              value={parameters.category}
              onChange={handleChange('categories')}
              inputProps={{
                name: 'categories',
                id: 'categories'
              }}
            >
              <option value="" />
              {categories.map((muscle) => (<option key={muscle.id} value={muscle.id}>{muscle.name}</option>))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="equipment">Equipment</InputLabel>
            <Select
              native
              value={parameters.equipment}
              onChange={handleChange('equipment')}
              inputProps={{
                name: 'equipment',
                id: 'equipment'
              }}
            >
              <option value="" />
              {equipments.map((muscle) => (<option key={muscle.id} value={muscle.id}>{muscle.name}</option>))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            onClick={handleSubmit}
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default withSnackbar(ExerciseFinder)
