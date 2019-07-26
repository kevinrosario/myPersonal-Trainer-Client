import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { updateExercise } from '../../api/workout'
import messages from '../Messages/messages'

// Functional Component
function EditExerciseDialog (props) {
  const { editExercisesDialogHandler, exercise, setExercise, user,
    workoutTemplate, setWorkoutTemplate, makeStyles, enqueueSnackbar } = props
  const classes = makeStyles()

  const handleSave = event => {
    updateExercise(exercise, user, workoutTemplate._id)
      .then(response => {
        enqueueSnackbar(messages.updatedSuccessfully, { variant: 'success' })
        setWorkoutTemplate(response.data.workoutTemplate)
      })
      .then(editExercisesDialogHandler)
      .catch(error => {
        enqueueSnackbar(messages.updateFailed, { variant: 'error' })
        console.error(error)
      })
  }

  const handleChange = name => event => {
    setExercise({ ...exercise, [name]: event.target.value })
  }

  return (
    <Fragment>
      <Dialog open aria-labelledby="exercise-dialog">
        <DialogContent>
          <div className={classes.exerciseForms}>
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
              label="Rest Time (seconds)"
              value={exercise.restTime}
              type="number"
              onChange={handleChange('restTime')}
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            color="secondary"
            variant="contained"
            onClick={editExercisesDialogHandler}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default withSnackbar(withRouter(EditExerciseDialog))
