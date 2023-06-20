import React, { Fragment } from 'react'
import {
    createReviewAction,

    getProductaction
} from '../action/productaction'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Loader from '../layout/loader';
import { Carousel } from "react-bootstrap";
import Metadata from '../layout/Metadata';
import { addcarditem } from '../action/cartaction';
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { clearReviewsubmitted, clearError } from "../slices/productslice"
import ProductReview from './productReview';
export default function Productdetails() {

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { product =[], isreviewSubmitted, error, } = useSelector((state) => state.productReducerState);
    const { isAuthenticate } = useSelector((state) => state.authReducerState);
    console.log("product", product)
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    // const [loading, setLoading] = useState(true)
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        if (isreviewSubmitted) {
            handleClose();
            toast("Review submitted successfully",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                    onOpen: () => {
                        dispatch(clearReviewsubmitted())
                    }
                })

          
        }
        if (error) {
            toast("Review submit Failed",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "error",
                    onOpen: () => {
                        dispatch(clearError())
                    }
                })
            return;
        }
        if (isreviewSubmitted || product) {

            dispatch(getProductaction(id));
            setLoading(false);

        }
    }, [isreviewSubmitted,])

    const increaseQuantity = () => {
        const count = document.querySelector(".count");
        if (product[0].stock === 0 || count.valueAsNumber >= product[0].stock) {
            return;
        }
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }


    const decreaseQuantity = () => {
        const count = document.querySelector(".count");
        if (count.valueAsNumber === 1) {
            return;
        }
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }
    const reviewsubmit = () => {
        // const formdata = new FormData();
        // formdata.append("rating", rating);
        // formdata.append("commend", comment);
        // formdata.append("productId", id)
        dispatch(createReviewAction({ rating, comment, id }))
        handleClose();
    }
    return (
        <>

            {loading ? <Loader /> :
                <div>
                    <Metadata title={product[0]?.name} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause="hover">

                                {product[0]?.images && product[0]?.images.map((item) => (
                                    // console.log("item",item),
                                    <Carousel.Item key={item._id}>
                                        <img src={item.image} className='d-block w-100' alt={product[0]?.name} height="500" width="500" />

                                    </Carousel.Item>
                                )
                                )}

                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product[0]?.name}</h3>
                            <p id="product_id">Product_id:{product[0]?.id} </p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${product[0]?.ratings / 5 * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">{product[0]?.numOfReviews} Reviews</span>

                            <hr />

                            <p id="product_price">${product[0]?.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQuantity}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQuantity}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4"
                                onClick={() => dispatch(addcarditem(product[0]?.id, quantity))}
                                disabled={product[0]?.stock === 0 ? true : false}>Add to Cart</button>

                            <hr />

                            <p>Status: <span className={product[0]?.stock > 0 ? "greenColor" : "redColor"} id="stock_status">
                                {product[0]?.stock > 0 ? "In Stock" : "Out of Stock"} </span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>Processor:{product[0]?.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product[0]?.seller}</strong></p>
                            {isAuthenticate ? <>
                                <button onClick={handleShow} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                    Submit Your Review
                                </button>

                            </> : <>
                                <div className='alert alert-danger mt-5'> Login to Post Review</div>
                            </>}


                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Submit Review</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <ul className="stars" >
                                                {
                                                    [1, 2, 3, 4, 5].map((star) =>
                                                    (<li className={`star ${star <= rating ? "orange" : ""}`}
                                                        value={star}
                                                        onClick={() => (setRating(star))}
                                                        onMouseOver={(e) => e.target.classList.add("yellow")}
                                                        onMouseOut={(e) => e.target.classList.remove("yellow")}
                                                    ><i className="fa fa-star"></i></li>)
                                                    )
                                                }


                                            </ul>

                                            <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                            </textarea>

                                            <button arial-label="close"
                                                disabled={loading} onClick={reviewsubmit} className='btn my-3 float-right review-btn px-4 text-white'>Submit</button>
                                        </Modal.Body>

                                    </Modal>
                                </div>

                            </div>

                        </div>

                    </div>
                 
                    {product.length >0 &&product[0].reviews && product[0].reviews.length > 0 ? <ProductReview reviews={product[0].reviews} /> : " "}
                </div>

            }

        </>








    )
}
