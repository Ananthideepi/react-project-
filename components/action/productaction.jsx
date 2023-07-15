// import axios from "axios";
import {
  productFail, productRequest, productSuccess
  , createReviewFail, createReviewSuccess, createReviewRequest,
  //  newproductSuccess, newproductRequest, newproductFail, clearNewProductCreated
} from "../slices/productslice";
import { db } from "../../firebase/firebase_config";
import { query, where } from "firebase/firestore";
import { getDoc, collection, doc, setDoc, getDocs, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
// import { query, where, } from "firebase/firestore";
export const getProductaction = (id) => async (dispatch) => {
  // console.log("product id", id)
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
  // console.log("reviewData", reviewData)
  try {
    dispatch(createReviewRequest());
    const Update_review = doc(db, "Products", reviewData.id);
    const review_Details = {
      comment: reviewData.comment,
      rating: reviewData.rating,
      submittedBy: reviewData.name,
      id:v4()
    };
    const docRef = doc(db, "Products", reviewData.id);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const dataArray = docSnap.data().reviews || [];
        const updatedDataArray = dataArray.map((item) => {
          if (item.submittedBy === reviewData.name) {
            item.comment = reviewData.comment;
            item.rating = reviewData.rating;
            item.submittedBy = reviewData.name;
          }
          return item;
        });
        // console.log("dataArray",updatedDataArray)
        updatedDataArray.push(review_Details);
        const docRef = await updateDoc(Update_review, { reviews: dataArray })

        console.log("review updated successfully");
        const updatedDocSnap = docSnap;
        const updatedData = updatedDocSnap.data();
        if (updatedData && updatedData.reviews) {
          const result = updatedData.reviews;
          // console.log("result", result);
          dispatch(createReviewSuccess(result));
        }
      }
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error);
    dispatch(createReviewFail(error));
  }
} 