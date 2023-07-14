import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    items: localStorage.getItem("cardItem") ? JSON.parse(localStorage.getItem("cardItem")) : [],
    loading: false,
    shippinginfo:localStorage.getItem("shippinginfo") ? JSON.parse(localStorage.getItem("shippinginfo")) : {}
}
const cardSlice = createSlice({
    name: "card",
    initialState: initialstate,
    reducers: {
        addcardRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        addcardSuccess(state, action) {
            // console.log("action.payload", {...action.payload})
            const item = action.payload;
            // ...............product item isalready hera or not
            const isItemExit = state.items.find((i) => i.product === item.product)
            if (isItemExit) {
                state = {
                    ...state,
                    loading: false
                }
            } else {
                state = {
                    items: [...state.items, item],
                    loading: false
                }

                localStorage.setItem("cardItem", JSON.stringify(state.items))
            }
            return state;
        },
        increaseCartitemQuantity(state, action) {
            state.items = state.items.map((item) => {
                if (item.product === action.payload) {
                    item.quantity = item.quantity + 1
                }
                return item;

            })
            localStorage.setItem("cardItem", JSON.stringify(state.items))
        },
        decreaseCartitemQuantity(state, action) {
            state.items = state.items.map((item) => {
                if (item.product === action.payload) {
                    item.quantity = item.quantity - 1
                }
                return item;

            })
            localStorage.setItem("cardItem", JSON.stringify(state.items))
        },
        removecarditem(state, action) {
            const filterItem = state.items.filter((item) => {
                return item.product !== action.payload
            });
            localStorage.setItem("cardItem", JSON.stringify(filterItem))
            return { ...state, items: filterItem }
        },
        shippinginformationstored(state,action){
            localStorage.setItem("shippinginfo", JSON.stringify(action.payload ));
                return{
                    ...state,
                    shippinginfo:action.payload
                }
        },
        ordercompleted(state,action){
            // localStorage.removeItem("shippinginfo");
            localStorage.removeItem("cardItem");
            sessionStorage.removeItem("orderinfo")
            return{
                items:  [],
                loading: false,
                shippinginfo: {}
            }
        }
        

    }
})

export const { addcardRequest, addcardSuccess, increaseCartitemQuantity, decreaseCartitemQuantity,ordercompleted, removecarditem,shippinginformationstored } = cardSlice.actions
export default cardSlice.reducer;