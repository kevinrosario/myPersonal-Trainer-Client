import React, { useEffect, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getAllTemplates } from '../../api/workout'
import { makeStyles } from '@material-ui/core/styles'
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
  root: {
    width: '100%'
  },
  add: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}))

// Functional Component
function WorkoutList (props) {
  const classes = useStyles()
  const { user, workoutTemplates, setWorkoutTemplates, exercisesDialogHandler } = props

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

  useEffect(() => {
    getAllTemplates(user)
      .then(response => setWorkoutTemplates(response.data.workoutTemplates))
      .catch(console.error)
  }, [])

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
