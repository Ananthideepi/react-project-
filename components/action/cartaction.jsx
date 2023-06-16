import { addcardRequest, addcardSuccess } from "../slices/cardslice"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase_config";


export const addcarditem = (id, quantity) => async (dispatch) => {
    try {
        dispatch(addcardRequest())
           // collect data from firebase......................................
           const collectionRef = collection(db, "Products");
           await getDocs(collectionRef).then((snapshot) => {
               let result = []
               // console.log("snapshot",snapshot)
               snapshot.docs.forEach((item) => {
                   // console.log("item",item.data())
                   result.push({ ...item.data(), id: item.id })
               });
            
// ...........................................................................
        const carditem=result.filter((item)=>item.id === id);
        console.log("carditem",carditem)
                dispatch(addcardSuccess({
                product:carditem[0].id,
                name:carditem[0].name,
                price:carditem[0].price,
                image:carditem[0].images[0].image,
                stock:carditem[0].stock,
                quantity,
            }))
        })
    } catch (error) {

    }
} 