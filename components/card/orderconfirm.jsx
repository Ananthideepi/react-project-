import React from 'react'
import { useSelector } from 'react-redux';
import Metadata from '../layout/Metadata';
import { Link, useNavigate } from 'react-router-dom';
import { shippingvalidation } from './shipping';
import { useEffect } from 'react';
import Checkoutsteps from './checkoutsteps';
export default function Orderconfirm() {
    const { shippinginfo, items } = useSelector(state => state.cartreducerstate);
    const { user } = useSelector(state => state.authReducerState)
    const navigate = useNavigate();
    // price details..............................................................
    let item_Price = items.reduce((acc, item) => (acc + item.price * item.quantity), 0);
    const shippingprice = item_Price > 200 ? 0 : 25;
    let taxPrice = Number(0.05 * item_Price);

    const totalPrice = Number(item_Price + shippingprice + taxPrice).toFixed(2);

    taxPrice = Number(taxPrice).toFixed(2);
    item_Price=Number(item_Price).toFixed(2);

    const procespayment=()=>{
    const data={
        item_Price,
        shippingprice,
        taxPrice,
        totalPrice
    }
    sessionStorage.setItem("orderinfo",JSON.stringify(data));
    navigate("/payment")
 }
    useEffect(() => {
        shippingvalidation(shippinginfo, navigate)
    }, [shippinginfo, navigate])

    return (
        <div>

            <Metadata title={"Order confirm"} />
            <Checkoutsteps shipping={true} orderconfirm={true} />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b>{user[0].name}</p>
                    <p><b>Phone:</b>{shippinginfo.phoneno}</p>
                    <p className="mb-4"><b>Address:</b>{shippinginfo.address},{shippinginfo.city} {shippinginfo.postalcode}, {shippinginfo.state},{shippinginfo.counrty} </p>
                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    <hr />
                    {items.map((item) => (
                        <>
                            <div className="cart-item my-1">
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>$ {item.quantity * item.price}</b></p>
                                    </div>

                                </div>

                            </div>
                            <hr />
                        </>))}
                    {/* <hr /> */}

                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">$ {item_Price}</span></p>
                        <p>Shipping: <span className="order-summary-values">$ {shippingprice}</span></p>
                        <p>Tax:  <span className="order-summary-values">$ {taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">$ {totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={procespayment}>Proceed to Payment</button>
                    </div>
                </div>


            </div>


        </div>
    )
}
