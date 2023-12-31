import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  loading: false,
  products: [],
  isProductDeleted: false,
  isProductUpdated:false,
  isProductCreated:false,
  isreviewDeleted:false,
  Review:[],
  isgotProducts:false
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
        products: action.payload,
        isgotProducts:true
      }
    },

    productsFail(state, action) {
      return {
        loading: false,
        error: action.payload
      }
    },
    clearProductError(state, action) {
      return {
        ...state,

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
    newproductRequest(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    newproductSuccess(state, action) {
      // console.log("action.payload", { ...action.payload })
      return {
        ...state,
        loading: false,
        products: action.payload,
        isProductCreated: true
      }
    },
    newproductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductCreated: false
      }
    }, clearNewProductCreated(state, action) {
      return {
        ...state,
        isProductCreated: false
      }
    },
    deleteproductRequest(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    deleteproductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        products: action.payload,
        isProductDeleted: true,
      }
    },
    deleteproductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isProductDeleted: false
      }
    }, clearProductdeleted(state, action) {
      return {
        ...state,
        isProductDeleted: false
      }
    },
    updateproductRequest(state, action) {
      return {
        ...state,
        loading: true,
        isProductUpdated: false
      }
    },
  updateproductSuccess(state, action) {
      return {
        ...state,
        loading: false,
        products: action.payload,
        isProductUpdated: true
      }
    },
    updateproductFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
     
      }
    }, clearupdateProduct(state, action) {
      return {
        ...state,
        isProductUpdated: false
      }
    },
    reviewRequest(state, action) {
      return {
        ...state,
        loading:true,
      }
    },
    reviewSuccess(state, action) {
      // console.log("action.payload", {...action.payload})
      return {
        ...state,
        loading:false,
        reviews: action.payload,
       
      }
    },
    reviewFail(state, action) {
      return {
        ...state,
        loading:false,
        error: action.payload
      }
    },
    deletereviewRequest(state, action) {
      return {
        ...state,
        loading: true,
      }
    },
    deletereviewSuccess(state, action) {
      return {
        ...state,
        loading: false,
        products: action.payload,
        isreviewDeleted: true,
      }
    },
    deletereviewFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isreviewDeleted: false
      }
    },
    clearreviewdeleted(state, action) {
      return {
        ...state,
        isreviewDeleted: false
      }
    },
  }
})

export const { productsRequest, productsSuccess, productsFail, setcount,
  clearProductError, AdminproductsRequest, clearProductdeleted, deleteproductRequest, deleteproductSuccess,
  newproductSuccess, newproductRequest, newproductFail, clearNewProductCreated,
  deleteproductFail, ClearerrorAdminproduct, AdminproductsSuccess, AdminproductsFail,
  updateproductFail,updateproductRequest,updateproductSuccess,clearupdateProduct,
  reviewRequest,reviewSuccess,reviewFail ,deletereviewRequest,deletereviewSuccess,deletereviewFail,clearreviewdeleted} = productsSlice.actions
export default productsSlice.reducer;