import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import ExerciseFinder from './ExerciseFinder'
import ExerciseList from './ExerciseList'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

// Functional Component
function ExercisesDialog (props) {
  const [open, setOpen] = useState(props.open)
  const [selectedExercises, setSeletectedExercises] = useState([])
  const [exerciseList, setExerciseList] = useState([])

  const handleClose = () => {
    const { dialogHandler } = props
    dialogHandler()
    setOpen(false)
  }

  const handleSubmit = event => {
    console.log(selectedExercises)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="exercise-dialog">
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withSnackbar(withRouter(ExercisesDialog))
