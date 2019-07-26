import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { createWorkoutTemplate, createMultipleExercises, updateWorkout } from '../../api/workout'

import ExerciseFinder from './ExerciseFinder'
import ExerciseList from './ExerciseList'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

// Functional Component
function ExercisesDialog (props) {
  const { open, history, user, selectedExercises,
    exerciseList, setExerciseList, setSeletectedExercises,
    dialogHandler, workoutTemplate, setWorkoutTemplate, makeStyles } = props

  const handleSubmit = event => {
    if (workoutTemplate) {
      createMultipleExercises(selectedExercises, user)
        .then(response => {
          // add response exercises to workoutTemplate
          workoutTemplate.exercises.push(...response.data.exercises)
          setWorkoutTemplate({ ...workoutTemplate, exercises: workoutTemplate.exercises })

          updateWorkout(workoutTemplate, user)
            .then(response => {
              setWorkoutTemplate(response.data.workoutTemplate)
            })
            .then(dialogHandler)
            .catch(console.error)
        })
        .catch(console.error)
    } else {
      createWorkoutTemplate(selectedExercises, user)
        .then(response => {
          props.setWorkoutTemplate(response.data.workoutTemplate)
          history.push(`/edit-workout/${response.data.workoutTemplate._id}`)
        })
        .then(dialogHandler)
        .catch(console.error)
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={dialogHandler} aria-labelledby="exercise-dialog">
        <DialogContent>
          {exerciseList.length === 0
            ? <ExerciseFinder
              setExerciseList={setExerciseList}
              makeStyles={makeStyles}
            />
            : <ExerciseList
              selectedExercises={selectedExercises}
              setSeletectedExercises={setSeletectedExercises}
              exerciseList={exerciseList}
              makeStyles={makeStyles}
            /> }
        </DialogContent>
        <DialogActions>
          {exerciseList.length !== 0
            ? (
              <Fragment>
                <Button
                  onClick={() => setExerciseList([])}
                  variant="contained"
                  color="secondary"
                >
                Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                Add
                </Button>
              </Fragment>
            )
            : ''}

          <Button
            onClick={dialogHandler}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withSnackbar(withRouter(ExercisesDialog))
