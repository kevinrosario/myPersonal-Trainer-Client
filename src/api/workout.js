import { apiUrl, thirdPartyAPI } from '../apiConfig'
import axios from 'axios'

export const getAllTemplates = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/workout-templates'
  })
}

export const getUserTemplates = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/user-workout-templates',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const getTemplate = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/workout-templates/' + id,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

// Call to third party API to request exercises
export const getExercises = parameters => {
  const parametersArr = Object.entries(parameters)
  let urlParameters = ''
  parametersArr.forEach(parameter => {
    if (parameter[1]) {
      urlParameters += `&${parameter[0]}=${parameter[1]}`
    }
  })
  return axios({
    method: 'GET',
    url: thirdPartyAPI + urlParameters
  })
}

export const updateWorkout = (workoutTemplate, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/workout-templates/${workoutTemplate._id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      workoutTemplate
    }
  })
}

export const destroyWorkout = (workoutTemplate, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + `/workout-templates/${workoutTemplate._id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const updateExercise = (exercise, user, workoutTemplateID) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + `/exercises/${exercise._id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      exercise,
      id: workoutTemplateID
    }
  })
}

export const createMultipleExercises = (exercises, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/multiple-exercises',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      exercises
    }
  })
}

export const createWorkoutTemplate = (exercises, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/workout-templates',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      exercises: exercises
    }
  })
}
