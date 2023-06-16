import { createSlice } from "@reduxjs/toolkit";
const initialstate = {
    orderDetails:{},
    userOrders:[],
    loading:false
}
const orderSlice=createSlice({
    name:"order",
    initialState:initialstate,
    reducers:{
        createOrderRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        createOrderSuccess(state,action){
            return{
               ...state,
               loading:false,
               orderDetails:action.payload 
            }
        },
        createOrderFailure(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        }
    }
})


export const { createOrderRequest, createOrderSuccess,  createOrderFailure } = orderSlice.actions
export default orderSlice.reducer;