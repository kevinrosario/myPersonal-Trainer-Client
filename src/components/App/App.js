import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import Header from '../Header/Header'
import UserAuth from '../UserAuth/UserAuth'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import EditWorkoutTemplate from './../WorkoutTemplate/EditWorkoutTemplate'
import MainScreen from './../MainScreen/MainScreen'
import Timer from './../Timer/Timer'
import makeStyles from './MaterialUIStyles.js'

function App () {
  const [workoutTemplate, setWorkoutTemplate] = useState(null)
  const [workoutTemplates, setWorkoutTemplates] = useState([])
  const [exercisesDialog, setExercisesDialog] = useState(false)
  const [editExercisesDialog, setEditExercisesDialog] = useState(false)
  const [selectedExercises, setSeletectedExercises] = useState([])
  const [exercise, setExercise] = useState([])
  const [exerciseList, setExerciseList] = useState([])
  const [user, setUser] = useState(null)
  const [restTime, setRestTime] = useState(3)
  const [timerInterval, setTimerInterval] = useState(null)
  const [finishedExercises, setFinishedExercises] = useState([])
  const [unfinishedExercises, setUnfinishedExercises] = useState([])
  const [currentExercise, setCurrentExercise] = useState(null)

  const exercisesDialogHandler = event => {
    setExercisesDialog(!exercisesDialog)
    setExerciseList([])
    setSeletectedExercises([])
  }

  const editExercisesDialogHandler = event => {
    setEditExercisesDialog(!editExercisesDialog)
  }

  const clearUser = () => {
    setWorkoutTemplate(null)
    setWorkoutTemplates([])
    setExerciseList([])
    setFinishedExercises([])
    setUnfinishedExercises([])
    setUser(null)
  }

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <Header user={user} >
        <Route path='/user-auth' render={() => (
          <UserAuth open={true} setUser={setUser} />
        )} />
        <AuthenticatedRoute user={user} path='/sign-out' render={() => (
          <SignOut
            clearUser={clearUser}
            user={user}
          />
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword open={true} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/edit-workout/:id' render={() => (
          <EditWorkoutTemplate
            user={user}
            makeStyles={makeStyles}
            exercisesDialog={exercisesDialog}
            exercisesDialogHandler={exercisesDialogHandler}
            exercise={exercise}
            setExercise={setExercise}
            workoutTemplate={workoutTemplate}
            setWorkoutTemplate={setWorkoutTemplate}
            editExercisesDialog={editExercisesDialog}
            editExercisesDialogHandler={editExercisesDialogHandler}
            selectedExercises={selectedExercises}
            setSeletectedExercises={setSeletectedExercises}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        )} />
        <AuthenticatedRoute user={user} exact path='/home' render={() => (
          <MainScreen
            user={user}
            makeStyles={makeStyles}
            exercisesDialog={exercisesDialog}
            exercisesDialogHandler={exercisesDialogHandler}
            workoutTemplate={workoutTemplate}
            setWorkoutTemplate={setWorkoutTemplate}
            workoutTemplates={workoutTemplates}
            setWorkoutTemplates={setWorkoutTemplates}
            selectedExercises={selectedExercises}
            setSeletectedExercises={setSeletectedExercises}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
            setUnfinishedExercises={setUnfinishedExercises}
          />
        )} />
        <AuthenticatedRoute user={user} exact path='/workout-timer' render={() => (
          <Timer
            makeStyles={makeStyles}
            workoutTemplate={workoutTemplate}
            restTime={restTime}
            setRestTime={setRestTime}
            timerInterval={timerInterval}
            setTimerInterval={setTimerInterval}
            finishedExercises={finishedExercises}
            setFinishedExercises={setFinishedExercises}
            unfinishedExercises={unfinishedExercises}
            setUnfinishedExercises={setUnfinishedExercises}
            currentExercise={currentExercise}
            setCurrentExercise={setCurrentExercise}
          />
        )} />
      </Header>
    </SnackbarProvider>
  )
}

export default App
