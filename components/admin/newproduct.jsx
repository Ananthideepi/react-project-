import React, { useState } from 'react'
import Sidebar from './sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Newproduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [cattegory, setCatogory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [image, setImage] = useState([]);
  // const [imagecleared,setImagecleared]=useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const { loading, isProductCreated, error } = useSelector(state => state.productReducerState);
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
  const navigate = useNavigate();
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

  const submitHandler=(e)=>{
e.preventDefault();
const formData=new FormData();
  }
  return (
    <div>

      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>

        <div className='col-12 col-md-10'>

          <>
            <div className="wrapper my-5">
              <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
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
                  <select className="form-control" id="category_field">
                    <option value="">Select</option>
                    {Categories.map((item, i) => <option key={i} value={item}>{item}</option>)}

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
                  {imagePreview.map((item) => (
                    <img className='mt-3 mr-2'
                      key={item}
                      src={item}
                      alt={"imageReview"}
                      width="55"
                      height="52"
                    ></img>))}
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
