<template>
  <div>
    <q-btn
      color="orange-5"
      text-color="white"
      label="CreateProduct"
      @click="dialog = true"
      />
    <q-dialog v-model="dialog" width="70">
      <q-card flat bordered class="register-product-form">
        <q-card-section>
          <div class="text-6">Product Registry</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="productData.name" label="Product name"></q-input>
          <q-radio v-model="productData.unit" label="Unit" :val="true"></q-radio>
          <q-radio v-model="productData.unit" label="Package" :val="false"></q-radio>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" @click="dialog = false" />
          <q-btn flat label="Add" @click="registerProduct()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { EventBus } from '../main'
import productService from '@/services/product.service.js'

export default {
  data () {
    return {
      dialog: false,
      productData: {
        name: '',
        stock: 0,
        unit: ''
      }
    }
  },
  methods: {
    registerProduct () {
      let newProduct = {
        name: this.productData.name,
        stock: this.productData.stock,
        unit: this.productData.unit
      }
      console.log(newProduct.unit)
      productService.createProduct(newProduct)
        .then(response => {
          console.log(response)
          EventBus.$emit('refreshTable', 'getProducts')
        })
        .catch(error => {
          console.log(error)
          alert('No se ha podido crear correctamente el producto. Por favor vuelva a intentarlo en unos momentos.')
        })
    }
  }
}
</script>

<style scoped>

.register-product-form {
  width: 700px;
  max-width: 80vw;
}

</style>
