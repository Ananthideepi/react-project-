import { createOrderRequest, createOrderSuccess, createOrderFailure, UserOrderSuccess, 
    // UserOrderRequest, UserOrderFailure,  
      OrderDetailsFailure,OrderDetailsSuccess,  OrderDetailsRequest } from "../slices/orderslice";
import { addDoc, getDoc,getDocs, where,query, collection, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase_config";

export const createOrder = (order) => async (dispatch) => {

    console.log("orderitem",order)
    // console.log("order adddress",order.shippinginfo)
    console.log("order.user",order.user)
    try {
        dispatch(createOrderRequest())

        const collectionRef = collection(db, "order")
        const docRef = await addDoc(collectionRef, { items: order.orderItem, id: "",
         reference_id:order.user[0].id,
         shippingDetails: order.shippinginfo,
         shippingprice:order.shippingprice,
         taxPrice:order.taxPrice,
         totalPrice:order.totalPrice,
         user:order.user, createdAt: serverTimestamp() })
        // console.log("docRef", docRef.id)

        //..............................single data get from fire store...................
        const docSnap = await getDoc(docRef);
        const result = [];

        // id push to firebase................................
        const updateid = doc(db, "order", docRef.id)
        const docRefs = await updateDoc(updateid, { id: docRef.id })
        // console.log("docRef",docRefs)
        // get order  data from firebase..................................................
        const getupdate_data = await getDoc(updateid);
        const Order_info = getupdate_data.data();
        result.push(Order_info);
        dispatch(createOrderSuccess(result));

    } catch (error) {
        dispatch(createOrderFailure("Error in Order Making"));
    }
}
export const UserorderLists =(id)=> async (dispatch) => {
    // console.log("id",id) 
    try {
        // dispatch(UserOrderRequest())

        const q = query(collection(db, "order"), where("reference_id", "==",id));
        const querySnapshot = await getDocs(q);
        const result = [];

        querySnapshot.forEach((doc) => {
            //   console.log(doc.id, " => ", doc.data());
            // console.log(doc.id, " => ", doc.data().id);
            result.push({ ...doc.data() })

         } )
            // console.log("result",result)

        dispatch(UserOrderSuccess(result));
    } catch (error) {
        // dispatch(UserOrderFailure(error))
    }
}
export const UserorderDetails =(id)=> async (dispatch) => {
    // console.log("id",id) 
    try {
        dispatch(OrderDetailsRequest())

        const q = query(collection(db, "order"), where("id", "==",id));
        const querySnapshot = await getDocs(q);
        const result = [];

        querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
            // console.log(doc.id, " => ", doc.data().id);
            result.push({ ...doc.data() })

         } )
            // console.log("result",result)

        dispatch(OrderDetailsSuccess(result));
    } catch (error) {
        dispatch(OrderDetailsFailure("error in showing order Details"))
    }
}

