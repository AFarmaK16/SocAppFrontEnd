import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    products: [],
    filteredProducts: [],
    productDetails: [],
    totalProducts: 0,
    minPrice: 0,
    maxPrice: 0,
    // sort: 'price-lowest',
    // filters: {
    //     search: '',
    //     category: 'all',
    //     company: 'all',
    //     price: 0,
    //     shipping: false
    // }
};


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        replaceProducts: (state, action) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
            state.totalProducts = action.payload.length;
        },
        // setFilters: (state, action) => {
        //     state.filters = action.payload;
        // },
       
        setProductDetails: (state, action) => {
            state.productDetails = action.payload;
        },
        // addProduct: (state, action) => {
        //     const product = action.payload;
        //     state.products.unshift(product);
        // }
    }
});



export const productsActions = productsSlice.actions;

export default productsSlice;