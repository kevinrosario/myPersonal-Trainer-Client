import { apiUrl, thirdPartyAPI } from '../apiConfig'
import axios from 'axios'

export const getTemplates = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/workout-templates',
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

export const createExercise = (exercises, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/exercises',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      exercises: exercises
    }
  })
}
