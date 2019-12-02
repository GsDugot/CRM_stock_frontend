<template>
  <q-layout>
    <div class="row items-start">
      <div class="col self-center">
         <q-separator color="orange" inset />
      </div>
      <div class="column items-center">
        <h3>Products Section</h3>
      </div>
      <div class="col self-center">
         <q-separator color="orange" inset />
      </div>
    </div>
    <ProductTable/>
  </q-layout>
</template>

<script>
import ProductTable from '@/components/ProductTable'

export default {
  components: {
    ProductTable
  }
}
</script>

<style>

</style>
