import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getTemplates } from '../../api/workout'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import ExercisesDialog from './../WorkoutTemplate/ExercisesDialog'

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

  const [workoutTemplate, setWorkoutTemplate] = useState({})
  const [workoutTemplates, setWorkoutTemplates] = useState([])
  const [exercisesDialog, setExercisesDialog] = useState(false)
  const [selectedExercises, setSeletectedExercises] = useState([])
  const [exerciseList, setExerciseList] = useState([])

  console.log(workoutTemplate)

  const exercisesDialogHandler = event => {
    setExercisesDialog(!exercisesDialog)
  }

  const workoutTemplatesArr = workoutTemplates.map(workoutTemplate => (
    <li key={workoutTemplate._id}>
      <h2>{workoutTemplate.name}</h2>
    </li>
  ))

  useEffect(() => {
    getTemplates(props.user)
      .then(response => setWorkoutTemplates(response.data.workoutTemplates))
  }, [])

  return (
    <div>
      {exercisesDialog
        ? <ExercisesDialog
          open={true}
          user={props.user}
          dialogHandler={exercisesDialogHandler}
          setWorkoutTemplate={setWorkoutTemplate}
          selectedExercises={selectedExercises}
          setSeletectedExercises={setSeletectedExercises}
          exerciseList={exerciseList}
          setExerciseList={setExerciseList}
        />
        : ''}
      {workoutTemplatesArr !== 0
        ? (
          <div>
            <h3>Workouts</h3>
            <ul>{workoutTemplatesArr}</ul>
          </div>)
        : ''}

      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={exercisesDialogHandler}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default withRouter(MainScreen)
