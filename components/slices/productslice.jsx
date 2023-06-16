import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  loading: false,
  product:{}
 
}
const productSlice = createSlice({
  name: "product",
  initialState: initialstate,
  reducers:{
        productRequest(state,action){
          return{
            loading:true,
          }
        },
        productSuccess(state,action){
          // console.log("action.payload", {...action.payload})
          return{
            loading:false,
            product:action.payload
          }
        },
        productFail(state,action){
          return{
            loading:false,
           error:action.payload
          }
        },
  }
})

export const { productRequest, productSuccess, productFail,} = productSlice.actions
export default productSlice.reducer;