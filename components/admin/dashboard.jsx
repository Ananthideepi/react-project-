import React, { useEffect } from 'react'
import Sidebar from './sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { GetAdminproductAction } from '../action/productsaction';
import { GetUsersAction } from '../action/userloginaction';
import { AdminorderLists } from '../action/orderacion';

// import { AdminproductsSuccess } from '../slices/productsSlice';


export default function Dashboard() {
    const { products = [], } = useSelector((state) => state.productsReducerState);
    const { user = [] } = useSelector((state) => state.authReducerState);
    const{ Users=[]}=useSelector((state)=>state.adminUserReducerState)
    const { AdminOrders = [] } = useSelector((state) => state.orderReducerState);
    const dispatch = useDispatch();
    let outofstock = 0;
    if (products.length > 0) {
        products.forEach(item => {
            // console.log("stock", item.stock)
            if (item.stock === 0) {
                outofstock = outofstock + 1
            }
        })
    }

    useEffect(() => {
        dispatch(GetAdminproductAction)
        dispatch(GetUsersAction)
        dispatch(AdminorderLists)
    }, [dispatch])
    const stylebg = {
        background: "#ff818c"
    }
    return (
        <div>

            <div className='row'>
                <div className='col-12 col-md-2'>

                    <Sidebar />
                </div>
                <div className='col-12 col-md-10'>
                    <h1 className="my-4">Dashboard</h1>
                    <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white   o-hidden h-100" style={stylebg}>
                                <div className="card-body">
                                    <div className="text-center card-font-size">Total Amount<br /> <b>$3425</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pr-4">
                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white  o-hidden h-100" style={{ backgroundColor: "#dc3545" }}>
                                <div className="card-body">
                                    <div className="text-center card-font-size">Products<br /> <b>{products.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        {/* ff818c */}

                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white  o-hidden h-100" style={{ backgroundColor: "#dc3545" }}>
                                <div className="card-body">
                                    <div className="text-center card-font-size">Orders<br /> <b>{AdminOrders.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white  o-hidden h-100" style={{ backgroundColor: "#dc3545" }}>
                                <div className="card-body">
                                    <div className="text-center card-font-size">Users<br /> <b>{Users.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white  o-hidden h-100" style={{ backgroundColor: "#dc3545" }}>
                                <div className="card-body">
                                    <div className="text-center card-font-size">Out of Stock<br /> <b>{outofstock}</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
