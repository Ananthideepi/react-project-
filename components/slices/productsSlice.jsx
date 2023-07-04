import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  loading: false,
  // products:[]
}
const productsSlice = createSlice({
  name: "products",
  initialState: initialstate,
  reducers: {
    productsRequest(state, action) {
      return {
        loading: true,
      }
    },
    productsSuccess(state, action) {
      // console.log("action.payload", {...action.payload})
      return {
        loading: false,
        products: action.payload
      }
    },
    productsFail(state, action) {
      return {
        loading: false,
        error: action.payload
      }
    },
    setcount: (state, action) => {
      return {
        products: action.payload
      }
    },
    AdminproductsRequest(state, action) {
      return {
        loading: true,
      }
    },
   AdminproductsSuccess(state, action) {
      // console.log("action.payload", {...action.payload})
      return {
        loading: false,
        products: action.payload
      }
    },
   AdminproductsFail(state, action) {
      return {
        loading: false,
        error: action.payload
      }
    },
    ClearerrorAdminproduct(state, action) {
      return {
       ...state,
        error: null
      }
    },
  }
})

export const { productsRequest, productsSuccess, productsFail, setcount, AdminproductsRequest,ClearerrorAdminproduct,   AdminproductsSuccess,  AdminproductsFail } = productsSlice.actions
export default productsSlice.reducer;