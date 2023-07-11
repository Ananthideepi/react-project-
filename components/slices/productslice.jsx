import { createSlice } from "@reduxjs/toolkit";
// 
const initialstate = {
  // loading:false,
  product: [],
  isreviewSubmitted: false,
}
const productSlice = createSlice({
  name: "product",
  initialState: initialstate,
  reducers: {
    productRequest(state, action) {
      return {
        ...state,
        // loading:true,
      }
    },
    productSuccess(state, action) {
      // console.log("action.payload", {...action.payload})
      return {
        // ...state,
        // loading:false,
        product: action.payload,
        isreviewSubmitted: false
      }
    },
    productFail(state, action) {
      return {
        // ...state,
        // loading:false,
        error: action.payload
      }
    },
    createReviewRequest(state, action) {
      return {
        ...state,


      }
    },
    createReviewSuccess(state, action) {
      // console.log("action.payload", {...action.payload})
      return {
        ...state,

        isreviewSubmitted: true
      }
    },
    createReviewFail(state, action) {
      return {
        ...state,

        error: action.payload
      }
    },
    clearReviewsubmitted(state, action) {
      return {
        ...state,
        isreviewSubmitted: false
      }
    },
    clearError(state, action) {
      return {
        ...state,
        error: null
      }
    },

 
  }
})

export const { productRequest, productSuccess, productFail, clearError, clearReviewsubmitted, createReviewFail,
   createReviewSuccess, createReviewRequest
  } = productSlice.actions
export default productSlice.reducer;