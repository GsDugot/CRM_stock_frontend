import axios from 'axios'
import data from '@/config.json'

export default {
  init () {
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response !== undefined) {
        switch (error.response.status) {
          case 401:
            window.location.href = data.login.URL
            break
          case 500:
            alert('500: Ha sucedido algo inesperado en el servidor')
            break
          case 408:
            alert('408: Tiempo de espera de la solicitud agotado')
            break
          default:
            alert(error.response.status + ': Ha ocurrido un problema, por favor intentelo nuevamente en unos momentos')
            break
        }
      }
      return Promise.reject(error)
    })

    axios.interceptors.request.use(function (config) {
      const authToken = localStorage.getItem('token')
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`
      } else {
        window.location.href = data.login.URL
      }
      return config
    }, function (error) {
      alert('Ha ocurrido un error inesperado. Por favor visitanos en unos minutos.')
      return Promise.reject(error)
    })
  }
}
