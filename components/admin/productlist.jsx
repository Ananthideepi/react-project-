import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ClearerrorAdminproduct } from '../slices/productsSlice';
import { toast } from 'react-toastify';
import Loader from '../layout/loader';
import Sidebar from './sidebar'
import { MDBDataTable } from 'mdbreact'
export default function Productlist() {
    const { loading = true, products = [], error } = useSelector((state) => state.productsReducerState);
    const dispatch = useDispatch();
    const setProduct = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc"
                },
                {
                    label: "Price",
                    field: "price",
                    sort: "asc"
                }, {
                    label: "Stock",
                    field: "stock",
                    sort: "asc"
                }, {
                    label: "Action",
                    field: "Action",
                    sort: "asc"
                }
            ],
            rows: []
        }
        products.forEach((item) => {
            data.rows.push({
                id: item.id,
                name: item.name,
                price: `${item.price}`,
                stock: item.stock,
                Action: (
                    <>
                        <Link to={`/admin/product/${item.id}`} className='"btn btn-primary'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                        <Button className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </>
                )
            })
        })
        return data;
    }

    useEffect(() => {
        if (error) {
            toast("errorin productList showing", {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "error",
                onOpen: () => {
                    dispatch(ClearerrorAdminproduct())
                }
            })
            return
        }
        // dispatch(GetAdminproductAction())
    }, [dispatch,error])
    return (
        <div>

<div className='row'>
                <div className='col-12 col-md-2'>

                    <Sidebar />
                </div>
                <div className='col-12 col-md-10'>
                    <h1 className="my-4">ProductList</h1>
                   <>
                   {loading ? <Loader/>:
                   
                        <MDBDataTable className='px-3' bordered striped hover data={setProduct()} />
                
                   }
                   </>

                </div>

            </div>



        </div>
    )
}
