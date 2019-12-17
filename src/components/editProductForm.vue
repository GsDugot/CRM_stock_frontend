<template>
  <q-dialog v-model="show" width="80">
    <q-card flat bordered class="edit-product-form">
      <q-card-section>
        <div class="text-6">Actualizar datos del producto</div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="productData.name"
          label="Nombre del producto"
          clearable
          :rules="[val => !!val || 'El campo es requerido']"
        />
        <q-input
          v-model="productData.stock"
          label="Stock"
          clearable
          :rules="[val => !!val || 'El campo es requerido']"></q-input>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="CANCELAR" @click="closeForm()" />
        <q-btn flat label="ACTUALIZAR" @click="editProduct()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { EventBus } from '../main'
import data from '@/config.json'
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
      axios.put(data.path.apiURL + data.path.productPath + '/' + this.productCode, {
        name: this.productData.name,
        stock: this.productData.stock
      })
        .then(response => {
          EventBus.$emit('refreshTable', 'getProducts')
          this.$emit('input', false)
        })
        .catch(error => {
          console.log(error)
          alert('No se ha podido editar los datos del producto correctamente. Por favor vuelva a intentarlo en unos momentos.')
        })
    },
    closeForm () {
      this.$emit('input', false)
    }
  }
}
</script>

<style>

.edit-product-form {
  width: 700px;
  max-width: 80vw;
}

</style>
