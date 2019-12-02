<template>
  <div class="q-pa-md">
    <q-table
      class="my-sticky-virtscroll-table shadow-9"
      title="Treats"
      :data="products"
      :columns="columns"
      table-style="max-height: 400px"
      row-key="index"
      virtual-scroll
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      no-data-label="No items available"
      no-results-label="No items found"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="code" :props="props">
          {{ props.row.code }}
        </q-td>
         <q-td key="product" :props="props">
          {{ props.row.name }}
        </q-td>
         <q-td key="stock" :props="props">
          {{ props.row.stock }}
        </q-td>
         <q-td key="unit" :props="props">
          {{ props.row.unit }}
        </q-td>
        <q-td key="editButton" :props="props">
          <template>
            <q-btn
              round
              color="deep-orange"
              icon="create"
              @click="openProductEditForm(props.row)"
            >
            </q-btn>
            <editProductForm v-model="showProductEditForm"/>
          </template>
        </q-td>
         <q-td key="deleteButton" :props="props">
          <q-btn
            round
            color="deep-orange"
            icon="delete"
            @click="deleteDialog = true"/>
            <q-dialog v-model="deleteDialog">
              <q-card  flat bordered style="width: 300px; max-width: 60vw;">
                <q-card-section>
                  <div class="text-6">Delete this product?</div>
                </q-card-section>
                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" @click="deleteDialog = false" />
                  <q-btn flat label="Delete" @click="deleteProduct(props.row)" />
                </q-card-actions>
              </q-card>
            </q-dialog>
        </q-td>
      </q-tr>
    </q-table>
    <div class="column items-center">
      <div class="col self-center">
        <createProductForm />
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../main'
import axios from 'axios'
import { apiURL } from '@/data.js'
import createProductForm from './createProductForm'
import editProductForm from './editProductForm'

export default {
  components: {
    createProductForm,
    editProductForm
  },
  data () {
    return {
      products: [],
      showProductRegistrationForm: false,
      showProductEditForm: false,
      deleteDialog: false,
      productId: '',
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
          name: 'unit',
          align: 'center',
          label: 'Unit',
          field: 'unit',
          sortable: true
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
    this.getProducts()
  },
  created () {
    EventBus.$on('refreshTable', data => {
      this.getProducts()
    })
  },
  methods: {
    openProductRegistrationForm () {
      this.showProductRegistrationForm = true
    },
    openProductEditForm (data) {
      this.showProductEditForm = true
      EventBus.$emit('openProductEditForm', data)
    },
    getProducts () {
      axios.get(apiURL + '/product-management/products').then(response => {
        this.products = response.data
      })
    },
    deleteProduct (product) {
      this.productId = product._id
      console.log(product)
      axios.delete(apiURL + '/product-management/products/' + this.productId)
        .then(response => {
          console.log(response)
          this.deleteDialog = false
          this.getProducts()
        })
        .catch(error => {
          console.log(error)
        })
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
    background-color: #a8fc53

  thead tr:first-child th
    position: sticky
    top: 0
    opacity: 1
    z-index: 1
</style>
