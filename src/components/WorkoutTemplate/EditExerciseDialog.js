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
  const { editExercisesDialogHandler, exercise, setExercise, user } = props

  // const { open, history, user, selectedExercises,
  //   exerciseList, setExerciseList, setSeletectedExercises,
  //   dialogHandler } = props

  const handleSave = event => {
    updateExercise(exercise, user)
      .then(response => {
        setExercise(exercise)
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
              onChange={handleChange('sets')}
              margin="normal"
            />
            <TextField
              id="repetions"
              label="Repetions"
              value={exercise.repetions}
              onChange={handleChange('repetions')}
              margin="normal"
            />
            <TextField
              id="restTime"
              label="Rest Time"
              value={exercise.restTime}
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
