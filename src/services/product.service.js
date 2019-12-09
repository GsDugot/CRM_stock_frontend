import axios from 'axios'
import data from '@/config.json'

const URL = data.path.apiURL
const resourceURL = '/product-management/products'

export default {
  createProduct (object) {
    return new Promise((resolve, reject) => {
      axios.post(URL + resourceURL, object)
        .then(response => { console.log('Promesa de creacion recibida'); resolve(response) })
        .catch(error => { console.log('Promesa de creacion fallida'); reject(error) })
    })
  },
  getProducts () {
    return new Promise((resolve, reject) => {
      axios.get(URL + resourceURL)
        .then(response => { console.log('Promesa de obtencion recibida'); resolve(response) })
        .catch(error => { console.log('Promesa de obtencion fallida'); reject(error) })
    })
  },
  deleteProduct (productCode) {
    return new Promise((resolve, reject) => {
      axios.delete(URL + resourceURL + '/' + productCode)
        .then(response => { console.log('Promesa de eliminacion recibida'); resolve(response) })
        .catch(error => { console.log('Promesa de eliminacion fallida'); reject(error) })
    })
  },
  getProductByCode (productCode) {
    return new Promise((resolve, reject) => {
      axios.get(URL + resourceURL + '/' + productCode)
        .then(response => { console.log('Promesa de obtencion unica recibida'); resolve(response) })
        .catch(error => { console.log('Promesa de obtencion unica fallida'); reject(error) })
    })
  },
  editProduct (productCode) {
    return new Promise((resolve, reject) => {
      axios.put(URL + resourceURL + '/' + productCode)
        .then(response => { console.log('Promesa de edicion recibida'); resolve(response) })
        .catch(error => { console.log('Promesa de edicion fallida'); reject(error) })
    })
  }
}
