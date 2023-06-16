// import axios from "axios";
import { productFail, productRequest, productSuccess } from "../slices/productslice";
import { db } from "../../firebase/firebase_config";
import { collection, getDocs } from "firebase/firestore";

export const getProductaction = id=>async (dispatch) => {
    try {
        dispatch(productRequest())
        const collectionRef = collection(db, "Products");
            await getDocs(collectionRef).then((snapshot) => {
            let result = []
            // console.log("ko",snapshot)
            snapshot.docs.forEach((item) => {
                // console.log("item",item.data())
                result.push({ ...item.data(), id: item.id })
            });
      
        const data_id=result.filter((item)=>item.id===id)
        console.log("data_id", data_id)
        dispatch(productSuccess(data_id))
        // console.log("data", vart)
    });
    } catch (error) {
        dispatch(productFail(error.response.data.message));
    }

}
