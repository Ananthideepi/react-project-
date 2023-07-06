// import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { productsFail, productsRequest, productsSuccess, AdminproductsRequest, AdminproductsSuccess, AdminproductsFail, } from "../slices/productsSlice";
// import { data } from "./data";
import { newproductSuccess, newproductRequest, newproductFail, clearNewProductCreated } from "../slices/productslice";
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
            if (price) {
                let defaultprice = [1, 10000]
                if (price[0] === defaultprice[0] && price[1] === defaultprice[1]) {
                    if (keyword) {
                        if (category) {
                            console.log("category", category)
                            result = result.filter(item => item.category.toLocaleLowerCase().includes(category.toLocaleLowerCase()));
                            new Promise((resolve) => setTimeout(resolve, 1000))
                        }
                        else {
                            console.log("keyword", keyword)
                            result = result.filter(item => item.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
                            new Promise((resolve) => setTimeout(resolve, 1000))
                       
                        }
                    }
                }
                else {
                    console.log("Startprice", price)
                    result = result.filter(item => item.price >= price[0] && item.price <= price[1]);
                    new Promise((resolve) => setTimeout(resolve, 1000))
                }
            }

            if (rating) {
                console.log("rating", rating)
                result = result.filter(item => item.ratings.includes(rating))
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

export const GetAdminproductAction = async (dispatch) => {
    try {
        dispatch(AdminproductsRequest())
        const collectionRef = collection(db, "userAuthentication");
        await getDocs(collectionRef).then((snapshot) => {
            let result = []
            // console.log("snapshot",snapshot)
            snapshot.docs.forEach((item) => {
                // console.log("item",item.data())
                result.push({ ...item.data(), id: item.id })
            });
            console.log("result", result)
            dispatch(AdminproductsSuccess(result))
        })


    } catch (error) {
        dispatch(AdminproductsFail(error))
    }
}



export const CreatenewProduct = productdata => async (dispatch) => {
    try {
        dispatch(newproductRequest())
        const collectionRef = collection(db, "Products");
        await getDocs(collectionRef).then((snapshot) => {
            let result = []
            // console.log("snapshot",snapshot)
            snapshot.docs.forEach((item) => {
                // console.log("item",item.data())
                result.push({ ...item.data(), id: item.id })
            });
            console.log("result", result)
            dispatch(newproductSuccess(result))
        })


    } catch (error) {
        dispatch(newproductFail(error))
    }
}