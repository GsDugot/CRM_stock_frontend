import axios from 'axios'
import data from '@/config.json'

export default {
  init () {
    axios.interceptors.response.use(function (response) {
      console.log('Response has finished correctly')
      return response
    }, function (error) {
      switch (error.response.status) {
        case 401:
          // interceptar 401: redireccionar al login
          window.location.href = data.login.URL
          break
        case 500:
          // 500: mostrar alerta
          alert('Ha sucedido algo inesperado, por favor ingresa a la página nuevamente en un momento.')
          break
        case 408:
          // 408: mostrar timeout message
          console.log('Tiempo de espera de la solicitud agotado, vuelva a enviar su solicitud más tarde.')
          break
        default:
          console.log('Ha ocurrido un problema, por favor intentelo nevamente en unos momentos.')
          break
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