import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../layout/loader';
import Sidebar from './sidebar'
import { MDBDataTable } from 'mdbreact'
import { ClearOrderDeleted, clearError } from '../slices/orderslice';
import { AdminorderLists, DeleteOrderLists } from '../action/orderacion';

export default function Orderlist() {
    const { loading = true, AdminOrders = [], error,IsOrderDeleted } = useSelector((state) => state.orderReducerState);
 
    const dispatch = useDispatch();
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Number of Items",
                    field: "NumberofItems",
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc"
                }, {
                    label: "Status",
                    field: "status",
                    sort: "asc"
                }, {
                    label: "Action",
                    field: "action",
                    sort: "asc"
                }
            ],
            rows: []
        }

        AdminOrders.forEach((item) => {
            data.rows.push({
                id: item.id,
                NumberofItems: item.items.length,
                amount: `$${item.totalPrice}`,
                status:<p style={{color:item.status.toUpperCase().includes("DELIVERED")?"green":"red"}}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</p> ,
                action: (
                    <><Button>
                        <Link to={`/admin/order/${item.id}`} className='"btn btn-primary'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                        </Button>
                        <Button onClick={(e)=>deleteHandler(e,item.id)}className='btn btn-danger py-1 px-2 ml-2'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </>
                )
            })
        })
        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(DeleteOrderLists(id))
     
    }
    useEffect(() => {
        if (IsOrderDeleted) {
            toast("Product Deleted successfully",
              {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "success",
                onOpen: () => {
                  dispatch(ClearOrderDeleted());
                }
               
              })
            return;
          }
        if (error) {
            toast("error in product Delete" , {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "error",
                onOpen: () => {
                    dispatch(clearError())
                }
            })
            return
        }
      dispatch(AdminorderLists)
    }, [dispatch, error,IsOrderDeleted])
    return (
        <div>

            <div className='row'>
                <div className='col-12 col-md-2'>

                    <Sidebar />
                </div>
                <div className='col-12 col-md-10'>
                    <h1 className="my-4">Order List</h1>
                    <>
                        {loading ? <Loader /> :

                            <MDBDataTable className='px-3' bordered striped hover data={setOrders()} />

                        }
                    </>

                </div>

            </div>



        </div>
    )
}
