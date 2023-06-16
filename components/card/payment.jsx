import { useStripe, useElements, } from '@stripe/react-stripe-js'
import { CardExpiryElement, CardNumberElement, CardCvcElement } from '@stripe/react-stripe-js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { shippingvalidation } from './shipping'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ordercompleted } from '../slices/cardslice'

export default function Paymentpage() {

    const stripe = useStripe()
    const element = useElements()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderDta = JSON.parse(sessionStorage.getItem("orderinfo"));
    const { user } = useSelector(state => state.authReducerState)
    const { shippinginfo, items } = useSelector(state => state.cartreducerstate);
    const paymentData = {
        // *100 means convert to indeal rupees
        amount: Math.round(orderDta.totalPrice * 100),
        shipping: {
            name: user[0].name,
            address: {
                postal_code: shippinginfo.postalcode,
                country: shippinginfo.counrty,
                state: shippinginfo.state,
                line1: shippinginfo.address
            },
            phoneno: shippinginfo.phoneno

        }
    }
    const order = {
        orderItem: items,
        shippinginfo,
    }
    if (orderDta) {
        order.itemPrice = orderDta.item_Price
        order.shippingprice = orderDta.shippingprice
        order.taxPrice = orderDta.taxPrice
        order.totalPrice = orderDta.totalPrice
    }
    useEffect(() => {
        shippingvalidation(shippinginfo, navigate)
    })

    const submitHandeler = async (e) => {
        e.preventDefault();
        document.querySelector("#pay_btn").disabled = true;

        try {
            const { data } = await axios.post("", paymentData);
            const clientSecret = data.client_secret;
            const result = stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: element.getElement(CardNumberElement),
                    billing_details: {
                        name: user[0].name,
                        email: user[0].email,
                    }
                }
            });
            if (result.error) {
                toast.error((await result).error.message, {
                    type: "error",
                    position: toast.POSITION.BOTTOM_CENTER
                })
                document.querySelector("#pay_btn").disabled = false;
            } else {
                if ((await result).paymentIntent.status === "succeeded") {
                    toast("Payment Success", {
                        type: "success", position: toast.POSITION.BOTTOM_CENTER
                    })
                }
                dispatch(ordercompleted())
                navigate("/order/success")
            }
        } catch (error) {

            toast.error("Please Try Again", {
                type: "warning",
                position: toast.POSITION.BOTTOM_CENTER
            })

        }

    }






    return (
        <>

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandeler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"

                            />
                        </div>

                        <div className="form-group">
                            <label for="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"

                            />
                        </div>

                        <div className="form-group">
                            <label for="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"

                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay - {`$ ${orderDta && orderDta.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}
