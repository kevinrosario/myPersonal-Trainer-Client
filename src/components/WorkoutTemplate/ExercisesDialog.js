import React from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { createExercise } from '../../api/workout'

import ExerciseFinder from './ExerciseFinder'
import ExerciseList from './ExerciseList'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

// Functional Component
function ExercisesDialog (props) {
  const { open, history, user, selectedExercises, exerciseList, setExerciseList, setSeletectedExercises, dialogHandler } = props

  const handleSubmit = event => {
    createExercise(selectedExercises, user)
      .then(response => {
        props.setWorkoutTemplate(response.data.workoutTemplate)
        history.push(`/edit-workout/${response.data.workoutTemplate._id}`)
      })
      .then(dialogHandler)
      .catch(console.error)
  }

  return (
    <div>
      <Dialog open={open} onClose={dialogHandler} aria-labelledby="exercise-dialog">
        <DialogContent>
          {exerciseList.length === 0
            ? <ExerciseFinder setExerciseList={setExerciseList} />
            : <ExerciseList selectedExercises={selectedExercises} setSeletectedExercises={setSeletectedExercises} exerciseList={exerciseList} /> }
        </DialogContent>
        <DialogActions>
          {exerciseList.length !== 0
            ? (<Button
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
            Add exercises
            </Button>)
            : ''}
          <Button onClick={dialogHandler} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withSnackbar(withRouter(ExercisesDialog))
