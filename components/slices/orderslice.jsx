import { createSlice } from "@reduxjs/toolkit";
const initialstate = {
    orderDetails: [],
    userOrders: [],
    AdminOrders: [],
    loading: false,
    IsOrderDeleted: false,
    IsOrderupdated: false,
}
const orderSlice = createSlice({
    name: "order",
    initialState: initialstate,
    reducers: {
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        createOrderSuccess(state, action) {
            // console.log("action.pjg",action.payload[0].items)
            return {
                ...state,
                loading: false,
                orderDetails: action.payload,
                //    userOrders:action.payload[0].items
            }
        },
        createOrderFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        UserOrderRequest(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        UserOrderSuccess(state, action) {
            // console.log("action.payload",action.payload)
            return {
                ...state,
                loading: false,
                userOrders: action.payload,
            }
        },
        UserOrderFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        OrderDetailsRequest(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        OrderDetailsSuccess(state, action) {
            // console.log("action.payload",action.payload)
            return {
                ...state,
                loading: false,
                orderDetails: action.payload,
            }
        },
        OrderDetailsFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        AdminOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        AdminOrderSuccess(state, action) {
            // console.log("action.payload",action.payload)
            return {
                ...state,
                loading: false,
                AdminOrders: action.payload,
            }
        },
        AdminOrderFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        DeleteOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        DeleteOrderSuccess(state, action) {
            // console.log("action.payload",action.payload)
            return {
                ...state,
                loading: false,
                IsOrderDeleted: true
            }
        },
        DeleteOrderFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        UpdateOrderRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        UpdateOrderSuccess(state, action) {
            // console.log("action.payload",action.payload)
            return {
                ...state,
                loading: false,
                IsOrderupdated: true
            }
        },
        UpdateOrderFailure(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        ClearOrderDeleted(state, action) {
            return {
                ...state,
                IsOrderDeleted: false
            }
        },
        ClearOrderUpdated(state, action) {
            return {
                ...state,
                IsOrderupdated: false
            }
        }


    }
})


export const { createOrderRequest, createOrderSuccess, clearError,
    createOrderFailure, UserOrderSuccess, UserOrderRequest, UserOrderFailure,
    OrderDetailsFailure, OrderDetailsSuccess, OrderDetailsRequest, AdminOrderRequest,
    AdminOrderSuccess, AdminOrderFailure, DeleteOrderRequest, DeleteOrderSuccess, DeleteOrderFailure,
    UpdateOrderRequest, UpdateOrderSuccess, UpdateOrderFailure, ClearOrderDeleted, ClearOrderUpdated } = orderSlice.actions
export default orderSlice.reducer;