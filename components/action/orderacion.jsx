import { createOrderRequest, createOrderSuccess,  createOrderFailure} from"../slices/orderslice
export const createOrder=(order)=>async(dispatch)=>{
try {
    dispatch(createOrderRequest)
    
} catch (error) {
    
}
}