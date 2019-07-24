import React, { Fragment, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { getTemplate, updateWorkout, destroyWorkout } from '../../api/workout'
import { makeStyles } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import TextField from '@material-ui/core/TextField'
import EditExerciseList from './EditExerciseList'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  typography: {
    padding: theme.spacing(2)
  },
  add: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  fab: {
    marginRight: 5
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}))

// Functional Component
function EditWorkoutTemplate (props) {
  const classes = useStyles()
  const { user, workoutTemplate, setWorkoutTemplate, enqueueSnackbar, history,
    editExercisesDialogHandler, editExercisesDialog, exercise,
    setExercise } = props

  useEffect(() => {
    getTemplate(user, props.match.params.id)
      .then(response => setWorkoutTemplate(response.data.workoutTemplate))
      .catch(console.error)
  }, [])

  const handleChange = name => event => {
    setWorkoutTemplate({ ...workoutTemplate, [name]: event.target.value })
  }

  const handleUpdate = event => {
    updateWorkout(workoutTemplate, user)
      .then(() => {
        enqueueSnackbar('Updated Successfully', { variant: 'success' })
      })
      .catch(console.error)
  }

  const handleDestroy = event => {
    destroyWorkout(workoutTemplate, user)
      .then(() => {
        history.push('/home')
        enqueueSnackbar('Deleted Successfully', { variant: 'success' })
      })
      .catch(console.error)
  }

  return (
    <Fragment>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          {workoutTemplate
            ? (
              <Fragment>
                <TextField
                  id="workout-name"
                  label="Name"
                  className={classes.textField}
                  value={workoutTemplate.name || ''}
                  onChange={handleChange('name')}
                  margin="normal"
                />
                <Typography component="h1" variant="h5">
                List of Exercises
                </Typography>
                <EditExerciseList
                  user={user}
                  exercise={exercise}
                  setExercise={setExercise}
                  workoutTemplate={workoutTemplate}
                  setWorkoutTemplate={setWorkoutTemplate}
                  handleChange={handleChange}
                  editExercisesDialog={editExercisesDialog}
                  editExercisesDialogHandler={editExercisesDialogHandler}
                />
              </Fragment>
            )
            : ''}
        </div>
      </Container>
      <div className={classes.add}>
        <Fab aria-label="Start Exercise" className={classes.fab}>
          <FitnessCenterIcon />
        </Fab>
        <Fab aria-label="Save Exercise" className={classes.fab} color="secondary" onClick={handleUpdate}>
          <SaveIcon />
        </Fab>
        <Fab aria-label="Delete Exercise" className={classes.fab} color="secondary" onClick={handleDestroy}>
          <DeleteIcon />
        </Fab>
        <Fab aria-label="Add Exercise" color="primary" >
          <AddIcon />
        </Fab>
      </div>
    </Fragment>
  )
}

export default withSnackbar(withRouter(EditWorkoutTemplate))
