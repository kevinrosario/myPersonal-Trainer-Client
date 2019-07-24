import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

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
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  typography: {
    padding: theme.spacing(2)
  }
}))

// Functional Component
function ExerciseList (props) {
  const classes = useStyles()
  const { selectedExercises, setSeletectedExercises } = props

  const handleToggle = value => () => {
    const currentIndex = selectedExercises.indexOf(value)
    const newChecked = [...selectedExercises]
    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setSeletectedExercises(newChecked)
  }

  const exercisesArr = props.exerciseList.map(exercise => (
    <ListItem key={exercise.id} role={undefined} dense button onClick={handleToggle(exercise)}>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={selectedExercises.indexOf(exercise) !== -1}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': `checkbox-list-label-${exercise.name}` }}
        />
      </ListItemIcon>
      <ListItemText id={exercise.id} primary={exercise.name} />
    </ListItem>
  ))

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        List of Exercises
        </Typography>
        <List className={classes.root}>
          {exercisesArr}
        </List>
      </div>
    </Container>
  )
}

export default ExerciseList
