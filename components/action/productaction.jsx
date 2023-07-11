// import axios from "axios";
import {
    productFail, productRequest, productSuccess
    , createReviewFail, createReviewSuccess, createReviewRequest,newproductSuccess,newproductRequest,newproductFail,clearNewProductCreated
} from "../slices/productslice";
import { db } from "../../firebase/firebase_config";

import {  getDoc, collection, doc,  getDocs, updateDoc } from "firebase/firestore";
// import { query, where, } from "firebase/firestore";
export const getProductaction = (id) => async (dispatch) => {
    console.log("product id",id)
    try {
        dispatch(productRequest())
        const collectionRef = collection(db, "Products");
        await getDocs(collectionRef).then((snapshot) => {
            let result = []
            // console.log("snapshot",snapshot)
            snapshot.docs.forEach((item) => {
                // console.log("item",item.data())
                result.push({ ...item.data(), id: item.id })
            });

            const data_id = result.filter((item) => item.id === id)
            // console.log("data_id", data_id)
            dispatch(productSuccess(data_id))

        });
    } catch (error) {
        dispatch(productFail(error.response.data.message));
    }

}


export const createReviewAction = (reviewData) => async (dispatch) => {
    console.log("reviewData", reviewData)
    try {
        dispatch(createReviewRequest())
        //     const config={
        //         header:{
        //             "Content-type":"application/json"
        //         }
        //     }
        const collectionRef = doc(db, "Products",reviewData.id);
        const docSnap = await getDoc(collectionRef);
        const result = [];
        if (docSnap.exists()) {
            //   console.log("Document data:", docSnap.data());
            result.push(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }

result[0].reviews=[{commend:reviewData.comment,rating:reviewData.rating}];

const docRef = await updateDoc(collectionRef, result[0])
    
      const submitReview = await getDoc(collectionRef);

     new Promise((resolve) => setTimeout(resolve, 1000))
     
        dispatch(createReviewSuccess(submitReview ))
    } catch (error) {
        dispatch(createReviewFail(error));
    }
}
