import React, { useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getUserTemplates } from '../../api/workout'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import FitnessCenter from '@material-ui/icons/FitnessCenter'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'

// Functional Component
function WorkoutList (props) {
  const { user, workoutTemplates, setWorkoutTemplates, exercisesDialogHandler, makeStyles } = props
  const classes = makeStyles()

  useEffect(() => {
    getUserTemplates(user)
      .then(response => setWorkoutTemplates(response.data.workoutTemplates))
      .catch(console.error)
  }, [])

  const workoutTemplatesArr = workoutTemplates.map(workoutTemplate => {
    const labelId = `checkbox-list-secondary-label-${workoutTemplate.name}`
    return (
      <ListItem key={workoutTemplate._id} component={Link} to={`/edit-workout/${workoutTemplate._id}`} button alignItems='center' divider={true}>
        <ListItemText id={labelId}>
          <Typography variant="h6">
            {workoutTemplate.name}
          </Typography>
        </ListItemText>
        <ListItemSecondaryAction>
          <Fab aria-label="start" size="small" variant="extended" className={classes.edit}>
            <FitnessCenter />
            Start
          </Fab>
        </ListItemSecondaryAction>
      </ListItem>
    )
  })

  return (
    <Fragment>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography variant="h5">
            List of Workouts
          </Typography>
          <List className={classes.root}>
            {workoutTemplatesArr}
          </List>
        </div>
      </Container>
      <Fab color="primary" aria-label="Add" className={classes.add} onClick={exercisesDialogHandler}>
        <AddIcon />
      </Fab>
    </Fragment>
  )
}

export default withRouter(WorkoutList)
