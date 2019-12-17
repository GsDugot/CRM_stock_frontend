import axios from 'axios'
import data from '@/config.json'

const URL = data.path.apiURL
const resourceURL = '/product-management/products'

export default {
  createProduct (object) {
    return new Promise((resolve, reject) => {
      axios.post(URL + resourceURL, object)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getProducts () {
    return new Promise((resolve, reject) => {
      axios.get(URL + resourceURL)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteProduct (productCode) {
    return new Promise((resolve, reject) => {
      axios.delete(URL + resourceURL + '/' + productCode)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getProductByCode (productCode) {
    return new Promise((resolve, reject) => {
      axios.get(URL + resourceURL + '/' + productCode)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  editProduct (productCode) {
    return new Promise((resolve, reject) => {
      axios.put(URL + resourceURL + '/' + productCode)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
