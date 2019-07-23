import apiUrl from '../apiConfig'
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
