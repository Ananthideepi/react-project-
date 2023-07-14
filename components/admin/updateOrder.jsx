import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UpdateOrderLists, UserorderDetails } from '../action/orderacion';
import { ClearOrderUpdated,clearError } from '../slices/orderslice';
import { Link } from 'react-router-dom';
export default function UpdateoOrder() {

    const formRef = useRef(null);
    const { id :orderId} = useParams();
    const { IsOrderupdated, orderDetails = [],AdminOrders = [],  error, } = useSelector(state => state.orderReducerState);
    const orderDetail = AdminOrders.filter((orderItem) => orderItem.id === orderId)
    console.log("orderDetails",orderDetail)
    const { shippingDetails = [], user = [], items, totalPrice = 0, payment = "" } = orderDetail[0];

    const [orderStatus, setOrderStatus] = useState("Processing");
    const [loading, setLoading] = useState(false);

    // const { user } = useSelector(state => state.authReducerState)
    // const navigate = useNavigate();

    const dispatch = useDispatch();
   

 
    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = {};
        orderData.status =orderStatus
     dispatch(UpdateOrderLists(orderId, orderData))
      

    }
   
    useEffect(() => {
        if (IsOrderupdated) { 
            toast("Order Updated successfully",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                    onOpen: () => {
                        dispatch(ClearOrderUpdated());
                        setLoading(false);

                    }
                })
        
            return;
        }
        if (error) {
            toast("Order update Failed",
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
        dispatch(UserorderDetails(orderId))
    }, [IsOrderupdated, error, dispatch, orderId])

    useEffect(() => {
        if (orderDetail[0].id) {
           setOrderStatus(orderDetail[0].status)
        }
    }, [orderDetail[0].id])

    return (
        <div>

            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>

                    <>
                    <div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-8 mt-5 order-details">
                                    {/* <Link to="/order">
                                        <h6> Back to order page</h6></Link> */}
                                    <h2 className="my-3" style={{fontWeight:"600"}}>Order #{orderId} </h2>

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name:{(user[0].name).toUpperCase()}</b> </p>
                                    <p><b>Phone:</b>{shippingDetails.phoneno}</p>
                                    <p className="mb-4"><b>Address:</b>{shippingDetails.address} ,{shippingDetails.city},{shippingDetails.postalcode},
                                        {shippingDetails.state} ,{shippingDetails.counrty}.
                                    </p>
                                    <p><b>Amount:</b> ${totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4">Payment</h4>
                                    <p className={orderDetail[0].payment && orderDetail[0].payment.includes('not') ?  'redColor':"greenColor"} ><b>{orderDetail[0].payment.toUpperCase()}</b></p>



                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={orderDetail[0].status && orderDetail[0].status.includes('Delivered') ? 'greenColor' : 'redColor'} ><b>{orderDetail[0].status.toUpperCase()}</b></p>



                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {items && items.map((item) => (

                                            // console.log("items",item)
                                            <div className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.image} alt="Laptop" height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <hr />
                                </div>

                        <div className="col-12 col-lg-3 mt-5">
                            <h4 className="my-4">Order Status</h4>
                            <div className="form-group">
                                <select 
                                className="form-control"
                                onChange={(e) => setOrderStatus(e.target.value)}
                                value={orderStatus}
                                name="status"
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                              
                            </div>
                            <button
                                disabled={loading}
                                onClick={submitHandler}
                                className="btn btn-primary btn-block"
                                >
                                    Update Status
                            </button>

                        </div>
                    </div>
               
                    </>

                </div>

            </div>


        </div>
    )
}