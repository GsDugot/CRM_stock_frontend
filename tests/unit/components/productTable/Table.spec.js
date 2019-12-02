import { assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ProductTable from '@/components/ProductTable.vue'

describe('ProductTable', () => {
  const wrapper = shallowMount(ProductTable)

  it('check if table is visible', () => {
    assert.isTrue(wrapper.find('#ProductsTable').exists())
  })
})
