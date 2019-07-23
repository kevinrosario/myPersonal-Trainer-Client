import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { } from '../../api/workout'
import ExerciseFinder from './ExerciseFinder'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

// Functional Component
function ExercisesDialog (props) {
  const [open, setOpen] = useState(props.open)
  // const [listComponent, setListComponent] = useState(false)
  // const [exerciseList, setExerciseList] = useState([])

  // const handleForms = () =>  {
  //   setListComponent(!exerciseList)
  // }

  const handleClose = () => {
    const { history, dialogHandler } = props
    dialogHandler()
    setOpen(false)
    history.push('/create-workout')
  }

  // const handleSubmit = event => {
  // }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="exercise-dialog">
        <DialogContent>
          <ExerciseFinder />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withSnackbar(withRouter(ExercisesDialog))
