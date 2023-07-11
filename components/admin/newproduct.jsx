import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { CreatenewProduct } from '../action/productsaction';
import { clearError, } from '../slices/productslice';
import { clearNewProductCreated } from '../slices/productsSlice';
import { toast } from "react-toastify";
import { useRef } from 'react';
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
  // const [imagecleared,setImagecleared]=useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const { isProductCreated, error } = useSelector(state => state.productsReducerState);
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
      dispatch(CreatenewProduct({ name, price, cattegory, description, stock, seller, image }))
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
  useEffect(() => {
    if (isProductCreated) {
      toast("Product created successfully",
        {
          position: toast.POSITION.BOTTOM_CENTER,
          type: "success",
          onOpen: () => {
            dispatch(clearNewProductCreated());
            setLoading(false);

          }

        })
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
  }, [isProductCreated, error, dispatch])
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
                <h1 className="mb-4">New Product</h1>

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
                  <select className="form-control" id="category_field" onChange={(e) => setCatogory(e.target.value)}>
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
                  CREATE
                </button>

              </form>
            </div>

          </>

        </div>

      </div>


    </div>
  )
}
