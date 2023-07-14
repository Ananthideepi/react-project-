
import { createSlice } from "@reduxjs/toolkit";
// 
const initialstate = {
    loading: false,
    user: [],
    Users: [],
    isuserupdated: false,
    isuserDeleted: false,
    getUserdata:false
}
const ADuserSlice = createSlice({
    name: "AdminuserSlice",
    initialState: initialstate,
    reducers: {
        usersRequest(state, action) {
            return {
                ...state,
                loading: true,

            }
        },
        usersSuccess(state, action) {
            // console.log("action.payload", {...action.payload})
            return {
                ...state,
                loading: false,
                Users: action.payload,

            }
        },
        usersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userRequest(state, action) {
            return {
                ...state,
                loading: true,

            }
        },
        userSuccess(state, action) {
            // console.log("action.payload", {...action.payload})
            return {
                ...state,
                loading: false,
                user: action.payload,
                getUserdata:true
            }
        },
        userFail(state, action) {
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
        DeleteUserRequest(state, action) {
            return {
                ...state,
                loading: true,

            }
        },
        DeleteuserSuccess(state, action) {
            // console.log("action.payload", {...action.payload})
            return {
                ...state,
                loading: false,
                isuserDeleted: true,

            }
        },
        DeleteuserFail(state, action) {
            return {
                ...state,
                loading: false,
                isuserDeleted: false
            }
        },
        UpdateUserRequest(state, action) {
            return {
                ...state,
                loading: true,

            }
        },
        UpdateuserSuccess(state, action) {
            // console.log("action.payload", {...action.payload})
            return {
                ...state,
                loading: false,
                isuserupdated: true,

            }
        },
        UpddateuserFail(state, action) {
            return {
                ...state,
                loading: false,
                isuserupdated: false
            }
        },
        clearUserDelete(state, action) {
            return {
                ...state,
                isuserDeleted: false
            }
        },
        clearUserUpdate(state, action) {
            return {
                ...state,
                isuserupdated: false,
                getUserdata:false
            }
        }
    }
})

export const { clearError,userRequest,userSuccess,userFail,usersRequest,usersSuccess,usersFail,DeleteUserRequest,
    DeleteuserSuccess,DeleteuserFail,UpdateUserRequest,UpddateuserFail,UpdateuserSuccess,clearUserDelete,clearUserUpdate
} = ADuserSlice.actions
export default ADuserSlice.reducer;