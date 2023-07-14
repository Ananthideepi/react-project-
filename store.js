
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import productsSlice from "./components/slices/productsSlice"
import productSlice from "./components/slices/productslice"
import authenticateslice from "./components/slices/authenticateslice"
import cardslice from "./components/slices/cardslice"
import orderSlice from "./components/slices/orderslice"
import ADuserSlice from "./components/slices/adminAccessUserslice"
const reducer = combineReducers({
  productsReducerState: productsSlice,
  productReducerState: productSlice,
  authReducerState: authenticateslice, 
  cartreducerstate:cardslice,
  orderReducerState :orderSlice,
  adminUserReducerState:ADuserSlice
})

export const store = configureStore({
  reducer,
  middleware: [thunk]
})
