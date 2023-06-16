// import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlice";
// import { data } from "./data";
import { db } from "../../firebase/firebase_config";

export const getProductsaction = (keyword = null, price = null, category = null, rating = null, currentpage = null) => async (dispatch) => {
    try {
        dispatch(productsRequest())
        // collect data from firebase......................................
        const collectionRef = collection(db, "Products");
        await getDocs(collectionRef).then((snapshot) => {
            let result = []
            // console.log("snapshot",snapshot)
            snapshot.docs.forEach((item) => {
                // console.log("item",item.data())
                result.push({ ...item.data(), id: item.id })
            });
            // .......................................................................

            if (keyword) {
                // console.log("keyword", keyword)
                result = result.filter(item => item.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
                new Promise((resolve) => setTimeout(resolve, 1000))
            }

            if (price) {
                // console.log("Startprice", price) 
                result = result.filter(item => item.price >= price[0] && item.price <= price[1]);
                new Promise((resolve) => setTimeout(resolve, 1000))
                // const vart = await dispatch(productsSuccess(data))
            }

            if (category) {
                // console.log("working")
                result = result.filter(item => item.category.toLocaleLowerCase().includes(category.toLocaleLowerCase()));
                // console.log("category",result)
                new Promise((resolve) => setTimeout(resolve, 1000))
            }
            if (rating) {
                console.log("rating", rating)
                result = result.filter(item => item.ratings.includes(rating))
                console.log("rating", result)
                new Promise((resolve) => setTimeout(resolve, 1000))
            }

            // ..................search data from url keyword is not used..................
            // const{ data }= await datas;
            // await new Promise((resolve) => setTimeout(resolve, 1000))
            // console.log("datas",datas)
            // await dispatch(productsSuccess(data))

            dispatch(productsSuccess(result))
        })
    } catch (error) {
        // error="data is not available";
        dispatch(productsFail(error));
    }

}



// ..............................................................................................................................................
// const filter={
//     keywordsearch:result.filter(item => item.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())),
//     pricesearch: result.filter(item => item.price >= price[0] && item.price <= price[1]),
//     categorysearch:result.filter(item => item.category.toLocaleLowerCase().includes(category.toLocaleLowerCase())),
//     ratingsearch: result = result.filter(item => item.ratings.includes(rating))
// }
// const filter_data = (filterpropery,givendata) => {
//     const result = [];
//     result.push(filter[filterpropery])
//     return result;
// }