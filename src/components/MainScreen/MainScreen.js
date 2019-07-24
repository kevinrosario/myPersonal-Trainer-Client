import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { getTemplates } from '../../api/workout'

// Styling
const useStyles = makeStyles(theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}))

// Functional Component
function MainScreen (props) {
  const classes = useStyles()
  const [workoutTemplates, setWorkoutTemplates] = useState([])

  const workoutTemplatesArr = workoutTemplates.map(workoutTemplate => (
    <li key={workoutTemplate.id}>
      <h2>{workoutTemplate.name}</h2>
    </li>
  ))

  useEffect(() => {
    getTemplates(props.user)
      .then(response => setWorkoutTemplates(response.data.workoutTemplates))
  }, [])

  return (
    <div>
      {workoutTemplatesArr !== 0
        ? (
          <div>
            <h3>Workouts</h3>
            <ul>{workoutTemplatesArr}</ul>
          </div>)
        : ''}

      <Fab color="primary" component={Link} to='/create-workout' aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default withRouter(MainScreen)
