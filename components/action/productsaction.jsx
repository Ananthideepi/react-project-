import { collection, getDocs } from "firebase/firestore";
import {
    productsFail, productsRequest, productsSuccess, AdminproductsRequest,
    AdminproductsSuccess, AdminproductsFail,
    deleteproductRequest, deleteproductSuccess, deleteproductFail,
    newproductSuccess, newproductRequest, newproductFail,
    updateproductFail, updateproductRequest, updateproductSuccess,
    reviewRequest, reviewSuccess, reviewFail, deletereviewRequest, deletereviewSuccess, deletereviewFail
} from "../slices/productsSlice";
import { query, where } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase_config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, getDoc, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";

export const getProductsaction = (keyword = null, price = null, category = null, rating = null, currentpage = null) => async (dispatch) => {
    try {
        dispatch(productsRequest())
        // collect data from firebase......................................
        const collectionRef = collection(db, "Products");
        await getDocs(collectionRef).then(
            (snapshot) => {
                let result = []
                // console.log("snapshot",snapshot)
                snapshot.docs.forEach((item) => {
                    // console.log("item", item.data())
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
                                keyword = ""
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
        const collectionRef = collection(db, "Products");
        await getDocs(collectionRef).then((snapshot) => {
            let result = []
            // console.log("snapshot",snapshot)
            snapshot.docs.forEach((item) => {
                // console.log("item",item.data())
                result.push({ ...item.data(), id: item.id })
            });
            // console.log("result", result)
            dispatch(AdminproductsSuccess(result))
        })


    } catch (error) {
        dispatch(AdminproductsFail(error))
    }
}
// .....................................................................................................................................
export const CreatenewProduct = productdata => async (dispatch) => {


    try {
        dispatch(newproductRequest())
        const empty = Number(null);
        const imageUrls = [];
        const uploadPromises = productdata.image.map((item) => {
            const storageRef = ref(storage, `images/${item.name + v4()}`);
            return uploadBytes(storageRef, item)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((image) => {
                    console.log('Uploaded an url:', image);
                    const image_url = { image }
                    imageUrls.push(image_url);
                })
                .catch((error) => {
                    console.error('Error uploading image:', error);
                });
        });

        await Promise.all(uploadPromises)
        // console.log("imageurl", imageUrls);
        const collectionRef = collection(db, "Products");
        const docRef = await addDoc(collectionRef, {
            name: productdata.name,
            price: productdata.price,
            category: productdata.cattegory,
            description: productdata.description,
            seller: productdata.seller,
            stock: productdata.stock,
            images: imageUrls,
            numOfReview: empty,
            ratings: empty,
            reviews: [],
            createdAt: serverTimestamp(),

        });
        const docSnap = await getDoc(docRef);

        const UploadID = doc(db, "Products", docRef.id);
        await updateDoc(UploadID, {
            id: docRef.id
        });
        let result = []
        await getDocs(collectionRef).then(
            (snapshot) => {
                // console.log("snapshot",snapshot)
                snapshot.docs.forEach((item) => {
                    // console.log("item",item.data())
                    result.push({ ...item.data(), id: item.id })
                });
            })
        dispatch(newproductSuccess(result))
    } catch (error) {
        dispatch(newproductFail(error))
    }
}
// .......................................................................................................................................
export const DeleteNewProduct = id => async (dispatch) => {
    // console.log("id", id)
    try {
        dispatch(deleteproductRequest())
        await deleteDoc(doc(db, "Products", id));
        const collectionRef = collection(db, "Products");
        const snapshot = await getDocs(collectionRef);
        const result = snapshot.docs.map((item) => ({
            ...item.data(),
            id: item.id,
        }));
        console.log("result", result)
        dispatch(deleteproductSuccess(result))
    } catch (error) {
        dispatch(deleteproductFail(error))

    }
}
// ...............................................................................................................................
export const updateProductAction = (id, productdata) => async (dispatch) => {
    // console.log("productadta", productdata)
    // console.log("pdid", id)

    try {
        dispatch(updateproductRequest())
        const imageUrls = [];
        const uploadPromises = productdata.image.map((item) => {
            const storageRef = ref(storage, `images/${item.name + v4()}`);
            return uploadBytes(storageRef, item)
                .then((snapshot) => getDownloadURL(snapshot.ref))
                .then((image) => {
                    // console.log('Uploaded an url:', image);
                    const image_url = { image }
                    imageUrls.push(image_url);
                })
                .catch((error) => {
                    // console.error('Error uploading image:', error);
                });
        });

        await Promise.all(uploadPromises)
        console.log("imageurl", imageUrls);

        const Update_product = doc(db, "Products", id);

        const docRef = await updateDoc(Update_product, {
            category: productdata.cattegory,
            description: productdata.description,
            images: imageUrls,
            name: productdata.name,
            price: productdata.price,
            seller: productdata.seller,
            stock: productdata.stock,
        });
        // console.log("docref", docRef)
        let result = []
        const collectionRef = collection(db, "Products");
        await getDocs(collectionRef).then(
            (snapshot) => {
                // console.log("snapshot",snapshot)
                snapshot.docs.forEach((item) => {
                    // console.log("item",item.data())
                    result.push({ ...item.data(), id: item.id })
                });
            })
        dispatch(updateproductSuccess(result))

    } catch (error) {
        console.log(error)
        dispatch(updateproductFail(error))
    }
}
// ...................................................................................................................
export const getReviewsAction = (id) => async (dispatch) => {
    // console.log("id", id)
    try {
        dispatch(reviewRequest())
        const q = query(collection(db, "Products"), where("id", "==", id));
        const result = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            result.push(doc.data());
            // result.push(id)
            // console.log("resulr",result)
        });
        if (result.length > 0) {
            const data_id = result[0].reviews;
            data_id.id = id
            // console.log("dta",data_id)
            dispatch(reviewSuccess(data_id,))
        }
    } catch (error) {
        dispatch(reviewFail())
    }
}
// ........................................................................................................................
export const DeleteReviewAction = (productid, id) => async (dispatch) => {
    console.log("productIg", productid, id)
    try {
        dispatch(deletereviewRequest())
        const q = query(collection(db, "Products"), where("id", "==", productid));
        const result = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push(doc.data().reviews);
        });

        const deleteresult = result[0].filter((item) => item.id !== id);
        console.log("deleteresult", deleteresult);
        const Update_product = doc(db, "Products", productid);
        try {
          await updateDoc(Update_product, { reviews: deleteresult });
          console.log("updated successfully");
        } catch (error) {
          console.log("Error updating", error);
        }
      
 
        dispatch(deletereviewSuccess())

    } catch (error) {
        dispatch(deletereviewFail())
    }
}