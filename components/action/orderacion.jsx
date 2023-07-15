import {
    createOrderRequest, createOrderSuccess, createOrderFailure, UserOrderSuccess,
    // UserOrderRequest, UserOrderFailure,  
    AdminOrderRequest, AdminOrderSuccess, AdminOrderFailure,
    DeleteOrderRequest, DeleteOrderSuccess, DeleteOrderFailure,
    UpdateOrderRequest, UpdateOrderSuccess, UpdateOrderFailure,
    OrderDetailsFailure, OrderDetailsSuccess, OrderDetailsRequest
} from "../slices/orderslice";
import { addDoc, getDoc, getDocs, where, query, collection, deleteDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase_config";

export const createOrder = (order) => async (dispatch) => {

    // console.log("orderitem",order)
    // console.log("order adddress",order.shippinginfo)
    // console.log("order.user",order.user)
    try {
        dispatch(createOrderRequest())

        const collectionRef = collection(db, "order")
        const docRef = await addDoc(collectionRef, {
            items: order.orderItem, id: "",
            reference_id: order.user[0].id,
            shippingDetails: order.shippinginfo,
            shippingprice: order.shippingprice,
            taxPrice: order.taxPrice,
            totalPrice: order.totalPrice,
            status: order.status,
            payment: order.payment,
            user: order.user, createdAt: serverTimestamp()
        })
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
export const UserorderLists = (id) => async (dispatch) => {
    // console.log("id",id) 
    try {
        // dispatch(UserOrderRequest())

        const q = query(collection(db, "order"), where("reference_id", "==", id));
        const querySnapshot = await getDocs(q);
        const result = [];

        querySnapshot.forEach((doc) => {
            //   console.log(doc.id, " => ", doc.data());
            // console.log(doc.id, " => ", doc.data().id);
            result.push({ ...doc.data() })

        })
        // console.log("result",result)

        dispatch(UserOrderSuccess(result));
    } catch (error) {
        // dispatch(UserOrderFailure(error))
    }
}
export const UserorderDetails = (id) => async (dispatch) => {
    // console.log("id",id) 
    try {
        dispatch(OrderDetailsRequest())

        const q = query(collection(db, "order"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        const result = [];

        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            // console.log(doc.id, " => ", doc.data().id);
            result.push({ ...doc.data() })

        })
        // console.log("result",result)

        dispatch(OrderDetailsSuccess(result));
    } catch (error) {
        dispatch(OrderDetailsFailure("error in showing order Details"))
    }
}
export const AdminorderLists = async (dispatch) => {
    // console.log("id",id) 
    try {
        dispatch(AdminOrderRequest())
        const collectionRef = collection(db, "order");
        const querySnapshot = await getDocs(collectionRef);
        const result = querySnapshot.docs.map((item) => {
            return { ...item.data(), id: item.id };
        });
        // console.log("resultadmin", result);
        dispatch(AdminOrderSuccess(result));


    } catch (error) {
        dispatch(AdminOrderFailure(error))
    }
}
export const DeleteOrderLists = (id) => async (dispatch) => {
    // console.log("id",id) 
    try {
        dispatch(DeleteOrderRequest())

        await deleteDoc(doc(db, "order", id));
        const collectionRef = collection(db, "order");
        const snapshot = await getDocs(collectionRef);
        const result = snapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id,
        }));
        console.log("result", result)
        // console.log("result",result)

        dispatch(DeleteOrderSuccess());
    } catch (error) {
        dispatch(DeleteOrderFailure(error))
    }
}
export const UpdateOrderLists = (id, orderData) => async (dispatch) => {
    // console.log("id",id) 
    // console.log("orderData",orderData) 
    try {
        dispatch(UpdateOrderRequest())
        const Update_Order = doc(db, "order", id);

        const docSnap = await getDoc(Update_Order);
        (docSnap.exists()) 
           if( docSnap.data().status !== "Delivered"){

            const docRef = await updateDoc(Update_Order, {
                status: orderData.status
            })
        };
        // console.log("docref", docRef)
        let result = []
        const collectionRef = collection(db, "order");
        await getDocs(collectionRef).then(
            (snapshot) => {
                // console.log("snapshot",snapshot)
                snapshot.docs.forEach((item) => {
                    // console.log("item",item.data())
                    result.push({ ...item.data(), id: item.id })
                });
            })

        dispatch(UpdateOrderSuccess(result));
    } catch (error) {
        dispatch(UpdateOrderFailure(error))
    }
}
