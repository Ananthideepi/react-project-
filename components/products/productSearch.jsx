import React, { useEffect, useState } from 'react'
import Metadata from '../layout/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination"
import { getProductsaction } from '../action/productsaction';
import Loader from '../layout/loader';
import Homeproduct from './homeproduct';
import { useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from "rc-tooltip";
import 'rc-tooltip/assets/bootstrap.css'
import { clearProductError } from '../slices/productsSlice';

export default function ProductSearch() {
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
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const { loading, products, error } = useSelector((state) => state.productsReducerState);
    // console.log("currentpage",products)
    const [currentpage, setCurrentpage] = useState(1);
    const [price, setPrice] = useState([1, 10000]);
    const [pricechange, setPriceChange] = useState(price);
    const [category, setCategory] = useState(null);
    const [rating, setRating] = useState(0);
    // console.log("category",category)
    const currentpageno = (pageno) => {
        setCurrentpage(pageno)
    }
    useEffect(() => {

        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

        dispatch(getProductsaction(keyword, pricechange, category, rating, currentpage))
        return () => {
           dispatch( clearProductError())
        }

    }, [error, dispatch, currentpage, keyword, pricechange, category, rating])
    //   console.log("total.length",products?.length)
    //   console.log("currentpage",currentpage)

    return (

        <>
            {loading ? <Loader /> :
                <div className=''>
                    <Metadata title={keyword} />
                    <h1 id="products_heading">Search Products</h1>
                    <section id="products" className="container mt-5">

                        <div className="row">


                            <div className="col-6 col-md-3 mb-5 mt-5">
                                {/* ..............................price range filter */}
                                <div className='px-5' onMouseUp={() => setPriceChange(price)} >
                                    <Slider
                                        range={true}
                                        marks={{
                                            1: "$1",
                                            10000: "$10000"
                                        }
                                        }
                                        min={1}
                                        max={10000}
                                        defaultValue={price}
                                        onChange={(price) => {
                                            setPrice(price)

                                            // console.log("keyword", price)
                                        }}
                                        handleRender={
                                            renderProps => {
                                                return (
                                                    <Tooltip overlay={`$${renderProps.props["aria-valuenow"]}`}>
                                                        <div {...renderProps.props}></div></Tooltip>
                                                )
                                            }
                                        }
                                    ></Slider>
                                </div>
                                {/* ..............................category filter */}
                                <hr className='my-5' />
                                <div className="mt-5">
                                    <h3 className='mb-2'>Categories</h3>
                                    <ul className='pl-0'>
                                        {Categories && Categories.map((item, i) =>
                                            <li style={{ cursor: "pointer", listStyleType: "none" }} key={item} onClick={() => setCategory(item)}>{item} </li>
                                        )}

                                    </ul>
                                </div>
                                {/*rating filter................................ */}
                                <hr className='my-5' />
                                <div className="mt-5">
                                    <h3 className='mb-2'>Rating</h3>
                                    <ul className='pl-0'>
                                        {[5, 4, 3, 2, 1].map((item, i) =>
                                            <li style={{ cursor: "pointer", listStyleType: "none" }} key={item} onClick={() => setRating(item)}>
                                                <div className="rating-outer">
                                                    <div className="rating-inner" style={{ width: `${item * 20}%` }}></div>
                                                </div>
                                            </li>
                                        )}

                                    </ul>

                                </div>
                            </div>

                            <div className="col-6 col-md-9 ">
                                <div className="row">
                                    {products && products.map((item) =>
                                        <Homeproduct key={item.id} col={4} item={item} />
                                    )}
                                </div>
                            </div>

                        </div>

                    </section>{products?.length > 0 && products?.length > 3 ?
                        <div className='d-flex justify-content-center mt-4'>
                            <Pagination
                                activePage={currentpage}
                                itemsCountPerPage={3}
                                totalItemsCount={products?.length}
                                // pageRangeDisplayed={5}
                                onChange={currentpageno}
                                nextPageText={"next"}
                                firstPageText={"first"}
                                lastPageText={"last"}
                                itemClass={"page-item"}
                                linkClass={"page-link"}
                            >

                            </Pagination>

                        </div> : null}
                </div>
            }
        </>
    )
}
