import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import ExercisesDialog from './../WorkoutTemplate/ExercisesDialog'
import WorkoutList from './../WorkoutTemplate/WorkoutList'

// Functional Component
function MainScreen (props) {
  const { user, workoutTemplates, setWorkoutTemplates, exercisesDialog, exercisesDialogHandler,
    workoutTemplate, setWorkoutTemplate, selectedExercises, setSeletectedExercises, exerciseList,
    setExerciseList } = props

  setWorkoutTemplate(null)

  return (
    <Fragment>
      {/* Set exercise dialog */}
      {exercisesDialog
        ? <ExercisesDialog
          open={true}
          user={user}
          dialogHandler={exercisesDialogHandler}
          workoutTemplate={workoutTemplate}
          setWorkoutTemplate={setWorkoutTemplate}
          selectedExercises={selectedExercises}
          setSeletectedExercises={setSeletectedExercises}
          exerciseList={exerciseList}
          setExerciseList={setExerciseList}
        />
        : ''}
      {/* Set workout list */}
      {workoutTemplates !== 0
        ? <WorkoutList
          user={user}
          workoutTemplates={workoutTemplates}
          setWorkoutTemplates={setWorkoutTemplates}
          exercisesDialogHandler={exercisesDialogHandler}
        />
        : ''}
    </Fragment>
  )
}
// {/**/}

export default withRouter(MainScreen)
