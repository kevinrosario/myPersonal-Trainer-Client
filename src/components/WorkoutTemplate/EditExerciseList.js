import React from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Fab from '@material-ui/core/Fab'
import EditIcon from '@material-ui/icons/Edit'
// import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import EditExerciseDialog from './EditExerciseDialog'
// Styling
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
  }
}))

// Functional Component
function EditExerciseList (props) {
  const classes = useStyles()
  const { user, workoutTemplate, editExercisesDialogHandler, editExercisesDialog, exercise,
    setExercise, setWorkoutTemplate } = props

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
