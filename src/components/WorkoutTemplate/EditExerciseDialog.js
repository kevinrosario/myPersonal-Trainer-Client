import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { updateExercise } from '../../api/workout'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'

// Functional Component
function EditExerciseDialog (props) {
  const { editExercisesDialogHandler, exercise, setExercise, user,
    workoutTemplate, setWorkoutTemplate } = props

  // const { open, history, user, selectedExercises,
  //   exerciseList, setExerciseList, setSeletectedExercises,
  //   dialogHandler } = props

  const handleSave = event => {
    updateExercise(exercise, user, workoutTemplate._id)
      .then(response => {
        setWorkoutTemplate(response.data.workoutTemplate)
      })
      .then(editExercisesDialogHandler)
      .catch(console.error)
  }

  const handleChange = name => event => {
    setExercise({ ...exercise, [name]: event.target.value })
  }

  return (
    <Fragment>
      <Dialog open aria-labelledby="exercise-dialog">
        <DialogContent>
          <div>
            <TextField
              id="sets"
              label="Sets"
              value={exercise.sets}
              type="number"
              onChange={handleChange('sets')}
              margin="normal"
            />
            <TextField
              id="repetions"
              label="Repetions"
              value={exercise.repetions}
              type="number"
              onChange={handleChange('repetions')}
              margin="normal"
            />
            <TextField
              id="restTime"
              label="Rest Time"
              value={exercise.restTime}
              type="number"
              onChange={handleChange('restTime')}
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={editExercisesDialogHandler}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default withSnackbar(withRouter(EditExerciseDialog))
