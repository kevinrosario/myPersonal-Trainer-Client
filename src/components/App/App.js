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

function App () {
  const [workoutTemplate, setWorkoutTemplate] = useState(null)
  const [workoutTemplates, setWorkoutTemplates] = useState([])
  const [exercisesDialog, setExercisesDialog] = useState(false)
  const [selectedExercises, setSeletectedExercises] = useState([])
  const [exerciseList, setExerciseList] = useState([])
  const [user, setUser] = useState(null)

  const exercisesDialogHandler = event => {
    setExercisesDialog(!exercisesDialog)
    setExerciseList([])
    setSeletectedExercises([])
  }

  const clearUser = () => setUser(null)

  return (
    <SnackbarProvider>
      <Header user={user} >
        <Route path='/user-auth' render={() => (
          <UserAuth open={true} setUser={setUser} />
        )} />
        <AuthenticatedRoute user={user} path='/sign-out' render={() => (
          <SignOut clearUser={clearUser} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword open={true} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/edit-workout/:id' render={() => (
          <EditWorkoutTemplate
            user={user}
            workoutTemplate={workoutTemplate}
            setWorkoutTemplate={setWorkoutTemplate}
          />
        )} />
        <AuthenticatedRoute user={user} exact path='/home' render={() => (
          <MainScreen
            user={user}
            exercisesDialog={exercisesDialog}
            exercisesDialogHandler={exercisesDialogHandler}
            setWorkoutTemplate={setWorkoutTemplate}
            workoutTemplates={workoutTemplates}
            setWorkoutTemplates={setWorkoutTemplates}
            selectedExercises={selectedExercises}
            setSeletectedExercises={setSeletectedExercises}
            exerciseList={exerciseList}
            setExerciseList={setExerciseList}
          />
        )} />
      </Header>
    </SnackbarProvider>
  )
}
// <main className="container">
//
// </main>
// Debugging
// <Route user={user} path='/' render={() => (
//   <ExercisesDialog open={true} user={user} />
// )} />

// {user
// ? <AuthenticatedRoute user={user} exact path='/' render={() => (
//   <MainScreen user={user} />
//   )} /> : ''}

export default App
