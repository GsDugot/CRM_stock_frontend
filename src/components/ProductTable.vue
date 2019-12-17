<template>
  <div class="q-pa-md">
    <q-table
      id="ProductsTable"
      class="my-sticky-virtscroll-table shadow-9"
      title="Productos"
      :data="products"
      :columns="columns"
      table-style="max-height: 400px"
      row-key="index"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      no-data-label="No hay productos disponibles"
      no-results-label="No se ha encontrado el producto"
    >
      <template v-slot:top-right>
        <q-input
          standout="bg-cyan-7"
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
          class="no-shadow"
        >
          <template v-slot:append>
            <q-icon name="search" @click="getProductByCode(filter)" />
          </template>
        </q-input>
      </template>
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="code" :props="props">{{ props.row.code }}</q-td>
        <q-td key="product" :props="props">{{ props.row.name }}</q-td>
        <q-td key="stock" :props="props">{{ props.row.stock }}</q-td>
        <q-td key="editButton" :props="props">
          <template>
            <q-btn round color="orange-5" icon="create" @click="openProductEditForm(props.row)"></q-btn>
          </template>
        </q-td>
        <q-td key="deleteButton" :props="props">
          <q-btn round color="orange-5" icon="delete" @click="showDeleteDialog(props.row)" />
        </q-td>
      </q-tr>
    </q-table>
    <div class="column items-center">
      <div class="col self-center">
        <createProductForm />
      </div>
    </div>
    <editProductForm v-model="showProductEditForm" />
    <q-dialog v-model="showDelete">
      <q-card flat bordered class="delete-card">
        <q-card-section>
          <div class="text-6">¿Esta seguro que desea eliminar este producto?</div>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="CANCELAR" @click="showDelete = false" />
          <q-btn flat label="ELIMINAR" @click="deleteProduct()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { EventBus } from '../main'
import createProductForm from './createProductForm'
import editProductForm from './editProductForm'
import productService from '@/services/product.service.js'

export default {
  components: {
    createProductForm,
    editProductForm
  },
  data () {
    return {
      products: [],
      showProductEditForm: false,
      showDelete: false,
      selectedProduct: {},
      filter: '',
      productCode: '',
      productRow: {},
      pagination: {
        rowsPerPage: 10
      },

      columns: [
        {
          name: 'code',
          label: '#',
          field: 'code'
        },
        {
          name: 'product',
          required: true,
          label: 'product',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'stock',
          align: 'center',
          label: 'Stock',
          field: 'stock'
        },
        {
          name: 'editButton',
          align: 'center',
          label: 'Edit',
          field: 'editButton'
        },
        {
          name: 'deleteButton',
          align: 'center',
          label: 'Delete',
          field: 'deleteButton'
        }
      ]
    }
  },
  mounted () {
    this.listProducts()
  },
  created () {
    EventBus.$on('refreshTable', data => {
      this.listProducts()
    })
  },
  methods: {
    openProductEditForm (data) {
      this.showProductEditForm = true
      EventBus.$emit('openProductEditForm', data)
    },
    listProducts () {
      productService.getProducts()
        .then(response => {
          this.products = response.data
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          // console.log('No se ha podido obtener correctamente la lista de productos. Por favor vuelva a intentarlo en unos momentos.')
        })
    },
    deleteProduct () {
      this.productCode = this.selectedProduct.code
      productService.deleteProduct(this.productCode)
        .then(response => {
          console.log(this.productCode)
          this.showDelete = false
          this.listProducts()
        })
        .catch(error => {
          console.log(error)
          // console.log('No se ha podido eliminar correctamente el producto. Por favor vuelva a intentarlo en unos momentos.')
        })
    },
    getProductByCode (code) {
      productService.getProductByCode(code)
        .then(response => {
          console.log(response)
          if (code === '') {
            this.listProducts()
          } else {
            this.products = [response.data]
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    showDeleteDialog (product) {
      this.showDelete = true
      this.selectedProduct = product
    }
  }
}
</script>

<style lang="sass">

.my-sticky-virtscroll-table
  .q-table__middle
    max-height: 200px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #81e0e6

  thead tr:first-child th
    position: sticky
    top: 0
    opacity: 1
    z-index: 1

</style>

<style scoped>
.delete-card {
  width: 300px;
  max-width: 60vw;
}
</style>
