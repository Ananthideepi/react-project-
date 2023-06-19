import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../layout/loader';
import { UserorderDetails } from '../action/orderacion';

export default function OrderDetails() {
    const { orderDetails = [], loading, } = useSelector(state => state.orderReducerState)
    const { shippingDetails = [], user = [], totalPrice = 0 } = orderDetails[0];
    //   const ispaid= paymentInfo &&paymentInfo.status==="success"?true:false;
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(UserorderDetails(id))
    }, [id])
    return (
        <div>

           {loading? <Loader/>:
            
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-details">

                    <h1 className="my-5">Order #{id} </h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p><b>Name:{(user[0].name).toUpperCase()}</b> </p>
                    <p><b>Phone:</b>{shippingDetails.phoneno}</p>
                    <p className="mb-4"><b>Address:</b>{shippingDetails.address} ,{shippingDetails.city},{shippingDetails.postalcode},
                        {shippingDetails.state} ,{shippingDetails.counrty}.
                    </p>
                    <p><b>Amount:</b> ${totalPrice}</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className="greenColor" ><b>PAID</b></p>


                    <h4 className="my-4">Order Status:</h4>
                    <p className='greenColor' ><b>Delivered</b></p>


                    <h4 className="my-4">Order Items:</h4>

                    <hr />
                    <div className="cart-item my-1">

                        <div className="row my-5">
                            <div className="col-4 col-lg-2">
                                <img src='./images/products/3.jpg' alt="Laptop" height="45" width="65" />
                            </div>

                            <div className="col-5 col-lg-5">
                                <a href="#">Laptop</a>
                            </div>


                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>$467</p>
                            </div>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <p>1 Piece(s)</p>
                            </div>
                        </div>
                        
                    </div>
                    <hr />
                </div>
            </div>
}

        </div>
    )
}
