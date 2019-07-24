import React, { useEffect } from 'react'
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
  const { workoutTemplates, user, exercisesDialog, exercisesDialogHandler,
    setWorkoutTemplate, selectedExercises, setSeletectedExercises, exerciseList,
    setExerciseList, setWorkoutTemplates } = props

  const workoutTemplatesArr = workoutTemplates.map(workoutTemplate => (
    <li key={workoutTemplate._id}>
      <h2>{workoutTemplate.name}</h2>
    </li>
  ))

  useEffect(() => {
    setSeletectedExercises([])
    setExerciseList([])
    getTemplates(user)
      .then(response => setWorkoutTemplates(response.data.workoutTemplates))
      .catch(console.error)
  }, [])

  return (
    <div>
      {exercisesDialog
        ? <ExercisesDialog
          open={true}
          user={user}
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
