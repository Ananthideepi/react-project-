import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  loading: false,
  isAuthenticate: false,
  islogin: false,
  user: []
}
const authSlice = createSlice({
  name: "authslice",
  initialState: initialstate,
  reducers: {
    // ..........................................login action.................................................
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
        // .....or........
        // isAuthenticate:false
      }
    },
    loginSuccess(state, action) {
      // console.log("actionpayload", [...action.payload]);
      // console.log("state", state);
      return {
        // console.log("action.payload", {...action.payload});
        loading: false,
        isAuthenticate: true,
        user: action.payload,
        islogin: true
      }
    },
    loginFail(state, action) {
      return {
        loading: false,
        isAuthenticate: false,
        error: action.payload,
        islogin: false
      }
    },
    clearerror(state, action) {
      return {
        loading: false,
        isAuthenticate: false,
        error: null
      }
    },
    // ...................................register action..................................................
    registerRequest(state, action) {
      return {
        loading: true,
        // ...state,
        // .....or........
        isAuthenticate: false
      }
    },
    registerSuccess(state, action) {
      // console.log("action.payload", { ...action.payload });
      return {
        //  console.log("action.payload", {...action.payload});
        loading: false,
        isAuthenticate: true,
        user: action.payload,
      }
    },
    registerFail(state, action) {
      return {
        loading: false,
        isAuthenticate: false,
        error: action.payload
      }
    },
    // .........................................load user .....for network token(localstorage token)...........................................
    loaduserRequest(state, action) {
      return {
        ...state,
        loading: true,
     
        // .....or........
        isAuthenticate: false
      }
    },
    loaduserSuccess(state, action) {
      // console.log("action.payload", {...action.payload});
      return {
        //  console.log("action.payload", {...action.payload});
        loading: false,
        isAuthenticate: true,
        user: action.payload,
      }
    },
    loaduserFail(state, action) {
      return {
        loading: false,
        isAuthenticate: false,
        error: action.payload
      }
    },
    // ............................logout field.....................................................
    LogoutSuccess(state, action) {
      // console.log("action.payload", {...action.payload});
      return {
        //  console.log("action.payload", {...action.payload});
        loading: false,
        isAuthenticate: false,
        // user: action.payload,
      }
    },
    LogoutFail(state, action) {
      return {
        ...state,
        // loading: false,
        // isAuthenticate: false,
        error: action.payload
      }
    },
    // ..............................update user details.................................  registerRequest(state, action) {
    updateprofileRequest(state, action) {
      return {
          ...state,
        loading: true,
      
   
        // .....or........
        isAuthenticate: true,
        isupdated: false,
        // user:action.payload
      }
    },
    updateprofileSuccess(state, action) {
      // console.log("action.payload", {...action.payload});
      return {
        //  console.log("action.payload", {...action.payload});
        ...state,
        loading: false,
       
        user: action.payload,
        isupdated: true,

      }
    },
    updateprofileFail(state, action) {
      return {
        ...state,
        loading: false,
      
        error: action.payload
      }
    },
    clearupdateprofile(state, action) {
      return {
        ...state,
        isupdated: false

      }
    },
    // .........................update password Request.............................................
    updatepasswordRequest(state, action) {
      return {
        ...state,
        isAuthenticate: false,
        islogin: false,
      


      
        loading: true,
        // .....or........
        // isAuthenticate: false,
        isupdated: false,
      }
    },
    updatepasswordSuccess(state, action) {
      console.log("action.payload", {...action.payload});
      return {
        //  console.log("action.payload", {...action.payload});
        ...state,
        loading: false,
        isupdated: true,
        isAuthenticate: true,
        user: action.payload,
      }
    },
    updatepasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },
    // ......................................forget password...................................
    forgetpasswordRequest(state, action) {
      return {

        ...state,
        loading: true,
        // .....or........
        isAuthenticate: false,
        message: null,
        reset: false
      }
    },
    forgetpasswordSuccess(state, action) {
      // console.log("action.payload", {...action.payload});
      return {
        //  console.log("action.payload", {...action.payload});
        isAuthenticate: false,
        loading: false,
        reset: true,
        message: action.payload,
        user:action.payload
      }
    },
    forgetpasswordFail(state, action) {

      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },
    // ..................................................reset passsword...................................
    resetpasswordRequest(state, action) {
      return {

        ...state,
        loading: true,
        // .....or........
        isAuthenticate: false,

      }
    },
    resetpasswordSuccess(state, action) {
      // console.log("action.payload", {...action.payload});
      return {
        //  console.log("action.payload", {...action.payload});
        ...state,
        loading: false,
        isAuthenticate: true,
        user: action.payload
      }
    },
    resetpasswordFail(state, action) {

      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },
  }
})

export const { loginRequest, loginSuccess, loginFail, clearerror,
  registerRequest, registerSuccess, registerFail,
  loaduserRequest, loaduserFail, loaduserSuccess,
  LogoutSuccess, LogoutFail,
  updateprofileSuccess, updateprofileFail, clearupdateprofile, updateprofileRequest,
  updatepasswordRequest, updatepasswordSuccess,
  updatepasswordFail, forgetpasswordRequest, forgetpasswordSuccess, forgetpasswordFail,
  resetpasswordRequest, resetpasswordSuccess, resetpasswordFail } = authSlice.actions
export default authSlice.reducer;