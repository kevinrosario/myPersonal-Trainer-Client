import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import ExercisesDialog from './../WorkoutTemplate/ExercisesDialog'
import WorkoutList from './../WorkoutTemplate/WorkoutList'

// Functional Component
function MainScreen (props) {
  const { user, workoutTemplates, setWorkoutTemplates, exercisesDialog, exercisesDialogHandler,
    workoutTemplate, setWorkoutTemplate, selectedExercises, setSeletectedExercises, exerciseList,
    setExerciseList, setUnfinishedExercises, setCurrentExercise, setRestTime,
    setSets, makeStyles } = props

  setWorkoutTemplate(null)

  return (
    <Fragment>
      {/* Set exercise dialog */}
      {exercisesDialog
        ? <ExercisesDialog
          open={true}
          user={user}
          makeStyles={makeStyles}
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
      <WorkoutList
        user={user}
        makeStyles={makeStyles}
        workoutTemplate={workoutTemplate}
        setWorkoutTemplate={setWorkoutTemplate}
        workoutTemplates={workoutTemplates}
        setWorkoutTemplates={setWorkoutTemplates}
        exercisesDialogHandler={exercisesDialogHandler}
        setUnfinishedExercises={setUnfinishedExercises}
        setCurrentExercise={setCurrentExercise}
        setRestTime={setRestTime}
        setSets={setSets}
      />
    </Fragment>
  )
}
// {/**/}

export default withRouter(MainScreen)
