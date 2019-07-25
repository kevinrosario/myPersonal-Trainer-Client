import React from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
import EditExerciseDialog from './EditExerciseDialog'

// Functional Component
function EditExerciseList (props) {
  const { user, workoutTemplate, editExercisesDialogHandler, editExercisesDialog, exercise,
    setExercise, setWorkoutTemplate, makeStyles } = props
  const classes = makeStyles()

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
            <li key={exercise._id + '-restTime'}>Rest Time: {exercise.restTime}</li>
          </ul>
        </ListItemText>
        <ListItemSecondaryAction>
          <Fab aria-label="Edit Exercise" size="small" onClick={() => {
            editExercisesDialogHandler()
            setExercise(exercise)
          }}>
            <EditIcon />
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

export default EditExerciseList
