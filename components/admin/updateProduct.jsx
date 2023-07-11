import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { updateProductAction } from '../action/productsaction';
import productslice, { clearError, } from '../slices/productslice';
import { clearupdateProduct } from '../slices/productsSlice';
import { toast } from "react-toastify";
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getProductaction } from '../action/productaction';
export default function Newproduct() {

    const formRef = useRef(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [cattegory, setCatogory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [image, setImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagecleared, setImagecleared] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);
    const { isProductUpdated, error, } = useSelector(state => state.productsReducerState);
    const { product = [] } = useSelector(state => state.productReducerState)
    const Categories = ['Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home']
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const onImagesChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(oldarray => [...oldarray, reader.result])
                    setImage(oldarray => [...oldarray, file])
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (name !== "" && price !== "" && cattegory !== "" && description !== "" && stock !== "") {
            setLoading(true)
            // const formData = new FormData();
            // formData.append("name", name);
            // formData.append("price", price);
            // formData.append("cattegory", cattegory);
            // formData.append("description", description);
            // formData.append("stock", stock);
            // formData.append("seller", seller);
            // // formData.append("image", image);
            // image.forEach((item)=> formData.append("image", item));
            // dispatch(CreatenewProduct(formData));
            dispatch(updateProductAction(id, { name, price, cattegory, description, stock, seller, image, imagecleared }))
            formRef.current.reset();
        }
        else {
            toast("Please Fill All The Field",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "warning",
                })
        }
    }
    const clearImagesHandles = () => {
        setImage([]);
        setImagePreview([]);
        setImagecleared(true);
    }
    useEffect(() => {
        if (isProductUpdated) {
            toast("Product Updated successfully",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                    onOpen: () => {
                        dispatch(clearupdateProduct());
                        setLoading(false);

                    }
                })
            setImage([]);
            return;
        }
        if (error) {
            toast("Product  update Failed",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "error",
                    onOpen: () => {
                        dispatch(clearError())
                        setLoading(false)
                    }
                })
            return;
        }
        dispatch(getProductaction(id))
    }, [isProductUpdated, error, dispatch,id])

    useEffect(() => {
        if (product[0]) {
            setName(product[0].name);
            setCatogory(product[0].category);
            setDescription(product[0].description);
            setPrice(product[0].price);
            setSeller(product[0].seller);
            setStock(product[0].stock);
            let images = [];
            product[0].images.forEach(item => {
                images.push(item.image)
            });
            setImagePreview(images);
        }
    }, [product])

    return (
        <div>

            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>

                    <>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" ref={formRef} encType='multipart/form-data' onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={price}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control"
                                        id="description_field"
                                        rows="8"
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description} ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select value={cattegory} className="form-control" id="category_field" onChange={(e) => setCatogory(e.target.value)}>
                                        <option value="">Select</option>
                                        {Categories.map((item, i) => (
                                            <option key={i} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        onChange={(e) => setStock(e.target.value)}
                                        value={stock}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        onChange={(e) => setSeller(e.target.value)}
                                        value={seller}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple
                                            onChange={onImagesChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    <div>
                                        {imagePreview.length > 0 && <span className="mr-2" style={{ cursor: "pointer" }} onClick={clearImagesHandles}>
                                            <i className='fa fa-trash'></i></span>}
                                        {imagePreview.map((item) => (
                                            <img className='mt-3 mr-2' style={{ width: "25px", height: "25px" }}
                                                key={item}
                                                src={item}
                                                alt={"imageReview"}
                                                width="25"
                                                height="25"
                                            ></img>))}
                                    </div>
                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-block py-3"
                                >
                                    UPDATE
                                </button>

                            </form>
                        </div>

                    </>

                </div>

            </div>


        </div>
    )
}