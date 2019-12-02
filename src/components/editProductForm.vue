<template>
  <q-dialog v-model="show" width="80">
    <q-card flat bordered style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-6">Edition of Products</div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="productData.name"
          label="Product name"
          clearable
        :rules="[val => !!val || 'Field is required']"
        />
        <q-input
          v-model="productData.stock"
          label="Stock"
          clearable
          :rules="[val => !!val || 'Field is required']"></q-input>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Close" @click="closeForm()" />
        <q-btn flat label="Update" @click="editProduct()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { EventBus } from '../main'
import { apiURL } from '@/data.js'
import axios from 'axios'

export default {
  props: {
    value: Boolean
  },
  data () {
    return {
      productCode: '',
      productData: {
        name: '',
        stock: ''
      }
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    }
  },
  created () {
    EventBus.$on('openProductEditForm', product => {
      this.productData = Object.assign({}, product)
      this.productCode = product.code
    })
  },
  methods: {
    editProduct () {
      axios.put(apiURL + '/product-management/products/' + this.productCode, {
        name: this.productData.name,
        stock: this.productData.stock
      })
        .then(response => {
          EventBus.$emit('refreshTable', 'getProducts')
          this.$emit('input', false)
        })
        .catch(error => {
          console.log(error)
        })
    },
    closeForm () {
      this.$emit('input', false)
    }
  }
}
</script>

<style>

</style>
