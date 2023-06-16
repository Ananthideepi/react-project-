import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, } from 'react-router-dom'
import { removecarditem, increaseCartitemQuantity, decreaseCartitemQuantity } from '../slices/cardslice';

export default function Cardtlayout() {
    const { items } = useSelector(state => state.cartreducerstate);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const increaseQuantity = (item) => {
        // console.log("decraeseitem",item)
        const count = item.quantity;
        if (item.stock === 0 || count >= item.stock) return
        dispatch(increaseCartitemQuantity(item.product))
    }
    const decreaseQuantity = (item) => {
        // console.log("increaseitem",item)
        // const count = item.quantity;
        if (item.quantity === 1) return
        dispatch(decreaseCartitemQuantity(item.product))
    }
    const checkouthandle = () => {
        navigate("/login?redirect=shipping")
    }
    return (
        <div>
            {items.length === 0 ?
                <h2 className='mt-5'>Your cart is Empty</h2>
                : (
                    <>
                        <h2 className="mt-5">Your Cart: <b>{items.length}items</b></h2>
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">
                                <hr />
                                {items.map((item) =>
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} height="90" width="115" alt={item.name} />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus"
                                                        onClick={() => decreaseQuantity(item)}
                                                    >-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus"
                                                        onClick={() => increaseQuantity(item)}
                                                    >+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item "
                                                    onClick={() => dispatch(removecarditem(item.product))}
                                                    className="fa fa-trash btn btn-danger"></i>
                                            </div>

                                        </div>
                                    </div>
                                )}


                                <hr />
                            </div>

                            <div className="col-12 col-lg-3 my-4">
                                <div id="order_summary">
                                    <h4>Order Summary</h4>
                                    <hr />
                                    <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc, item) => (acc + item.quantity), 0)}(Units)</span></p>
                                    <p>Est. total: <span className="order-summary-values">$ {items.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}</span></p>

                                    <hr />
                                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkouthandle}>Check out</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    )
}
