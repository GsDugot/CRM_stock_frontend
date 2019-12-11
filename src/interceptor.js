import axios from 'axios'

export default {
  init () {
    axios.interceptors.response.use(function (response) {
      console.log('Response has finished correctly')
      return response
    }, function (error) {
      console.log('An exception has ocurred')
      return Promise.reject(error)
    })

    axios.interceptors.request.use(function (response) {
      console.log('Request has finished correctly')
      return response
    }, function (error) {
      console.log('An exception has ocurred')
      return Promise.reject(error)
    })
  }
}
