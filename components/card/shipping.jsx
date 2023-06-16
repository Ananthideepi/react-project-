import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { countries } from 'countries-list';
import { shippinginformationstored } from '../slices/cardslice';
import { useNavigate } from 'react-router-dom';
import Checkoutsteps from './checkoutsteps';
import { toast } from 'react-toastify';

export const shippingvalidation=(shippinginfo,navigate)=>{
    // const { shippinginfo } = useSelector(state => state.cartreducerstate);
    // const navigate=useNavigate();
    if(!shippinginfo.address||!shippinginfo.city ||!shippinginfo.phoneno ||!shippinginfo.postalcode||!shippinginfo.counrty ||!shippinginfo.state ){
        toast.error("Please Fill the Shipping information" ,{ position: toast.POSITION.BOTTOM_CENTER });
        navigate("/shipping")
    }

}
export default function Shipping() {

    const { shippinginfo={} } = useSelector(state => state.cartreducerstate);
    const [address, setAddress] = useState(shippinginfo.address);
    const [city, setCity] = useState(shippinginfo.city)
    const [phoneno, setPhoneno] = useState(shippinginfo.phoneno)
    const [postalcode, setPostalcode] = useState(shippinginfo.postalcode)
    const [counrty, setCountry] = useState(shippinginfo.country)
    const [state, setState] = useState(shippinginfo.state)
    const countrylist = Object.values(countries);
    const dispath = useDispatch();
    const navigate=useNavigate();

  
    const submithandler = (e) => {
        e.preventDefault();
        dispath(shippinginformationstored({ address, phoneno, state, counrty, postalcode, city }))
        navigate("/order/confirm")
    }
    return (
        <div>
            <Checkoutsteps shipping={true}/>

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submithandler} >
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlhtmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneno}
                                onChange={(e) => setPhoneno(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalcode}
                                onChange={(e) => setPostalcode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={counrty}
                                onChange={(e) => setCountry(e.target.value)}
                                required>
                                {countrylist.map((item, i) => (
                                    <option key={i} value={item.name}>
                                        {item.name}
                                    </option>
                                )
                                )}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
