import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import FitnessCenter from '@material-ui/icons/FitnessCenter'
// import { getTemplate } from '../../api/workout'
import ExercisesDialog from './ExercisesDialog'

// Styling
const useStyles = makeStyles(theme => ({
  div: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  start: {
    marginRight: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}))

// Functional Component
function MainScreen (props) {
  const classes = useStyles()
  const [workoutTemplate, setWorkoutTemplate] = useState({})
  const [exercisesDialog, setExercisesDialog] = useState(false)
  console.log(workoutTemplate)
  // useEffect(() => {
  //   getTemplate(props.user, props.id)
  //     .then(response => setWorkoutTemplate(response.data.workoutTemplate))
  // }, [workoutTemplate])

  const exercisesDialogHandler = event => {
    setExercisesDialog(!exercisesDialog)
  }

  return (
    <div>
      {exercisesDialog
        ? <ExercisesDialog open={true} user={props.user} dialogHandler={exercisesDialogHandler} setWorkoutTemplate={setWorkoutTemplate} />
        : ''}

      <div className={classes.div}>
        <Fab variant="extended" aria-label="Start" className={classes.start}>
          <FitnessCenter className={classes.extendedIcon} />
        Start
        </Fab>
        <Fab color="secondary" onClick={exercisesDialogHandler} aria-label="Add" className={classes.add}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  )
}

export default withRouter(MainScreen)
