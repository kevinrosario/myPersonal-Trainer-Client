import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { createWorkoutTemplate, createMultipleExercises, updateWorkout } from '../../api/workout'
import messages from '../Messages/messages'
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
    dialogHandler, workoutTemplate, setWorkoutTemplate, makeStyles,
    enqueueSnackbar } = props

  const handleSubmit = event => {
    // I'm reusing this component to create and to update a workout
    if (workoutTemplate) {
      createMultipleExercises(selectedExercises, user)
        .then(response => {
          // add response exercises to workoutTemplate
          workoutTemplate.exercises.push(...response.data.exercises)
          setWorkoutTemplate({ ...workoutTemplate, exercises: workoutTemplate.exercises })
          // update workout
          updateWorkout(workoutTemplate, user)
            .then(response => {
              setWorkoutTemplate(response.data.workoutTemplate)
              enqueueSnackbar(messages.updatedSuccessfully, { variant: 'success' })
            })
            .then(dialogHandler)
            .catch(error => {
              console.error(error)
              enqueueSnackbar(messages.updateFailed, { variant: 'error' })
            })
        })
        .catch(error => {
          console.error(error)
          enqueueSnackbar(messages.updateFailed, { variant: 'error' })
        })
    } else {
      // If no workout is selected, create a new one
      createWorkoutTemplate(selectedExercises, user)
        .then(response => {
          props.setWorkoutTemplate(response.data.workoutTemplate)
          history.push(`/edit-workout/${response.data.workoutTemplate._id}`)
          enqueueSnackbar(messages.workoutCreated, { variant: 'success' })
        })
        .then(dialogHandler)
        .catch(error => {
          enqueueSnackbar(messages.createFailed, { variant: 'error' })
          console.error(error)
        })
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
