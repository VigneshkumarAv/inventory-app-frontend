import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProduct : []
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const {products, search} = action.payload
      const tempProducts = products?.filter((product)=> 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()))

      state.filteredProduct = tempProducts
  }
  }
});

export const {FILTER_PRODUCTS} = filterSlice.actions

export const selectFilteredProduct = (state) => state.filter.filteredProduct;

export default filterSlice.reducer