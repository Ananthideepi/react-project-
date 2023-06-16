import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
export default function SearchProduct() {
    const [searchdata, setSearchdata] = useState("");
    const Navigate = useNavigate();
// its used to locate the currectb location......
    const location=useLocation();

    const searchsubmit = (e) => {
        e.preventDefault();
        Navigate(`/search/${searchdata}`)
        setSearchdata("");
    }
    const clear=()=>{
        setSearchdata("")
    }
     useEffect(()=>{
        if(location.pathname ==="/"){
         clear();
        }
    },[location])
    return (
        <>
            <form onSubmit={searchsubmit}>
             
                    <div className="input-group">
                        <input
                            type="text"
                            id="search_field"
                            className="form-control"
                            placeholder="Enter Product Name ..."
                            onChange={(e) => setSearchdata(e.target.value)}
                            value={searchdata}
                         
                        />
                        <div className="input-group-append">
                            <button id="search_btn" className="btn">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
               
            </form>
        </>
    )
}
 