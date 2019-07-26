import React from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import EditExerciseDialog from './EditExerciseDialog'
import { destroyExercise } from '../../api/workout'
import { withSnackbar } from 'notistack'
import messages from '../Messages/messages'

// Functional Component
function EditExerciseList (props) {
  const { user, workoutTemplate, editExercisesDialogHandler, editExercisesDialog, exercise,
    setExercise, setWorkoutTemplate, makeStyles, enqueueSnackbar } = props
  const classes = makeStyles()

  const handleDestroy = (exercise, user, workoutTemplateID) => {
    destroyExercise(exercise, user, workoutTemplateID)
      .then((response) => {
        setWorkoutTemplate(response.data.workoutTemplate)
        enqueueSnackbar(messages.deletedSuccessfully, { variant: 'error' })
      })
      .catch(error => {
        console.error(error)
        enqueueSnackbar(messages.somethingFailed, { variant: 'error' })
      })
  }

  const exercisesArr = workoutTemplate.exercises.map(exercise => {
    return (
      <ListItem key={exercise._id} divider={true}>
        <ListItemText id={exercise._id}>
          <Typography variant="body1">
            {exercise.name}
          </Typography>
          <ul>
            <li key={exercise._id + '-sets'}>Sets: {exercise.sets}</li>
            <li key={exercise._id + '-reps'}>Reps: {exercise.repetions}</li>
            <li key={exercise._id + '-restTime'}>Rest Time: {exercise.restTime} seconds</li>
          </ul>
        </ListItemText>
        <ListItemSecondaryAction>
          <Fab className={classes.fab} aria-label="Edit Exercise" size="small" onClick={() => {
            editExercisesDialogHandler()
            setExercise(exercise)
          }}>
            <EditIcon />
          </Fab>
          <Fab className={classes.fab} aria-label="Delete Exercise" size="small"
            onClick={() => {
              handleDestroy(exercise, user, workoutTemplate._id)
            }}>
            <DeleteIcon />
          </Fab>
        </ListItemSecondaryAction>
      </ListItem>
    )
  })

  return (
    <List className={classes.root}>
      {exercisesArr}
      {editExercisesDialog
        ? <EditExerciseDialog
          user={user}
          open={true}
          makeStyles={makeStyles}
          workoutTemplate={workoutTemplate}
          exercise={exercise}
          setExercise={setExercise}
          setWorkoutTemplate={setWorkoutTemplate}
          editExercisesDialogHandler={editExercisesDialogHandler}
        />
        : ''}
    </List>
  )
}

export default withSnackbar(EditExerciseList)
