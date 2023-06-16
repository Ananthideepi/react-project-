
import { db } from "../../firebase/firebase_config";
import {
    loginFail, loginRequest, loginSuccess, clearerror, registerRequest,
    registerSuccess, registerFail, loaduserRequest, loaduserFail,
    loaduserSuccess, LogoutSuccess, LogoutFail, updateprofileRequest,
    updateprofileSuccess, updateprofileFail, updatepasswordRequest,
     updatepasswordSuccess, updatepasswordFail, forgetpasswordRequest, forgetpasswordSuccess, forgetpasswordFail,
    resetpasswordRequest, resetpasswordSuccess, resetpasswordFail, 
    
} from "../slices/authenticateslice"
import { addDoc, getDoc, collection,  serverTimestamp, doc,  getDocs, updateDoc } from "firebase/firestore";
import { query, where, } from "firebase/firestore";
// .....................................login user...correct...............................................
export const loginuser = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const q = query(collection(db, "userAuthentication"), where("email", "==", email), where("password", "==", password));
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
            //   console.log(doc.id, " => ", doc.data());
            //   console.log(doc.id, " => ", doc.data().name);
            result.push({ ...doc.data() })

        });
        if (result.length >= 1) {
            // console.log("result", result)
            dispatch(loginSuccess(result));

        } else {
            dispatch(loginFail("error"));
        }
        return;
    }
    catch (error) {
        console.log("error")
        dispatch(loginFail(error));
    }
}
// // ..................................................................................................................
export const clearLoginuserError = (dispatch) => {
    dispatch(clearerror());
}
// ......................................register field......................................................................................
export const registeruser = (userData, id) => async (dispatch) => {

    try {
        dispatch(registerRequest());
        const config = {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }
        //........................... registed Data stored to firebase.........
        const collectionRef = collection(db, "userAuthentication")
        const docRef = await addDoc(collectionRef, { name: userData.name, email: userData.email, password: userData.password, createdAt: serverTimestamp() })
        // console.log("docRef", docRef.id)

        //..............................single data get from fire store...................
        const docSnap = await getDoc(docRef);
        const result = []
        const userData_info = docSnap.data();
        // console.log("Document data:", docSnap.data());
        userData_info.id = docRef.id;
        result.push(userData_info)
        dispatch(registerSuccess(result, config));

    }
    catch (error) {
        dispatch(registerFail("Errorin RegisterUser"));
    }
}
// // .....................loaduser field...........................................................................................
export const loaduser = async (dispatch) => {
    let userlogindata;
    try {
        dispatch(loaduserRequest());
        // const config = {
        //     headers: {
        //         "Content-type": "multipart/form-data"
        //     }
        // }
        // const {data}= await axios.get( url)
        dispatch(loaduserSuccess(userlogindata));
        // console.log("userlogindata",userlogindata)
    }
    catch (error) {
        dispatch(loaduserFail("error"));
    }
}
// // .........................logout.................................................................................................
export const logout = async (dispatch) => {
    try {
        await dispatch(LogoutSuccess());
    }
    catch (error) {
        dispatch(LogoutFail("error"));
    }
}
// ..........................update profile action...........................
export const profileupdateUser = (userData, id) => async (dispatch) => {
    try {
        dispatch(updateprofileRequest());
        // console.log("id", id);
        // console.log("userData", userData)
        const config = {
            headers: {
                "Content-type": "multipart/form-data"
            }
        }
        // updateuser in firebase..............................................
        const collectionRef = doc(db, "userAuthentication", id)
        const update_data = {
            ...userData,
            id: id,
            name: userData.name,
            email: userData.email,
            createdAt: serverTimestamp()
        }
        const docRef = await updateDoc(collectionRef, update_data)
        // console.log("docRef",docRef)
        // getupdata data from firebase..................................................
        const getupdate_data = await getDoc(collectionRef);
        const updateuserDetails = [];

        if (getupdate_data.exists()) {
            // console.log("getupdate_data:", getupdate_data.data());
            updateuserDetails.push(getupdate_data.data())
        } else {
            console.log("No such document!");
        }
        new Promise((resolve) => setTimeout(resolve, 1000))
        // ......................................................
        dispatch(updateprofileSuccess(updateuserDetails, config));
        // console.log("updateuserDetails", updateuserDetails)
    }
    catch (error) {
        dispatch(updateprofileFail(error));
    }
}
// // .........................................update password action......................................................................................
export const passwordupdateUser = (userData, id) => async (dispatch) => {
      console.log("userData",userData)
    console.log("id", id)
    try {
        dispatch(updatepasswordRequest());
        // const config = {
        //     headers: {
        //         "Content-type": "application/json"
        //     }
        // }
        // get the data from firebase if oldpassword is matched.....................................................................
        const q = query(collection(db, "userAuthentication"), where("id", "==", id), where("password", "==", userData.oldpassword));
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
            //   console.log(doc.id, " => ", doc.data());
            console.log(doc.id, " => ", doc.data().password);
            result.push({ ...doc.data() })
        });
        result[0].password = userData.password;
        // console.log("resullt after",result)
        const collectionRef = doc(db, "userAuthentication", id)
        const docRef = await updateDoc(collectionRef, result[0])
        dispatch(updatepasswordSuccess(docRef));
        // console.log("userlogindata",userlogindata)
        // console.log("user", userlogindata)
    } 
    catch (error) {
        dispatch(updatepasswordFail("error"));
    }
}
// // ................................forget password action...........................................................................
export const forgetpasswordUser = (email) => async (dispatch) => {
console.log("userDataemail",email)
    try {
        dispatch(forgetpasswordRequest());
        const q = query(collection(db, "userAuthentication"), where("email", "==",email));
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
            //   console.log(doc.id, " => ", doc.data());
            console.log(doc.id, " => ", doc.data());
            result.push({ ...doc.data() })
        });
        if (result.length >= 1) {
            // console.log("result", result)
            dispatch(forgetpasswordSuccess(result));
        } 
        else {
            dispatch(forgetpasswordFail("error"));
        }
    }
    catch (error) {
        dispatch(forgetpasswordFail("error"));
    }
}
// // ...............................reset password action ......................................................

export const resetpasswordUser = (userData, token) => async (dispatch) => {
  console.log("userData",userData);
  console.log("id",token);
    try {
        dispatch(resetpasswordRequest());
        // const config = {
        //     headers: {
        //         "Content-type": "application/json"
        //     }
        // }
        const q = query(collection(db, "userAuthentication"), where("id", "==", token));
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
            //   console.log(doc.id, " => ", doc.data());
            // console.log("password", " => ", doc.data().password);
            result.push({ ...doc.data() })
        });
        result[0].password = userData.password;
        const collectionRef = doc(db, "userAuthentication", token)
        const docRef = await updateDoc(collectionRef, result[0])
       
        dispatch(resetpasswordSuccess(result));
        // console.log("userlogindata",result)
        // console.log("user", userlogindata)
        // if (result.length >= 1) {
        //     // console.log("result", result)
        //     dispatch(loginSuccess(result));

        // } else {
        //     dispatch(loginFail("error"));
        // }
        // return;
    }
    catch (error) {
        dispatch(resetpasswordFail("error"));
    }
}
// // ...........................................................................................