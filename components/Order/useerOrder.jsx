import React, { useState, useEffect } from 'react'
import Metadata from '../layout/Metadata'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { UserorderLists } from '../action/orderacion'
import { Link } from 'react-router-dom'

export default function UserOrder() {
    const { user } = useSelector(state => state.authReducerState)
    const { userOrders = []} = useSelector(state => state.orderReducerState)
    const [loading, setLoading] = useState(false)
      console.log("userOrders",userOrders)
    // const items_=userOrders.map((order)=> order.items,)
    // var merged_items = items_.reduce(function(prev, next) {
    //     return prev.concat(next);
    //   });
    // console.log("items_", merged_items)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(UserorderLists(user[0].id))
        setLoading(true)
    }, [dispatch,user])
    const setOrder = () => {

        const data = {
            columns: [
                {
                    label: "OrderID",
                    field: "id",
                    sorts: "asc"
                },
                {
                    label: "Number Of Items",
                    field: "Numberofitem",
                    sorts: "asc"
                },
                {
                    label: "Amount",
                    field: "amount",
                    sorts: "asc"
                },
                {
                    label: "Status",
                    field: "status",
                    sorts: "asc"
                },
                {
                    label: "Action",
                    field: "action",
                    sorts: "asc"
                },
            ],
            rows: [],
        }
        userOrders.map((order) => {
            const items_ = []
            items_.push(order.items);
            var merged_items = items_.reduce( (prev, next) => prev.concat(next));

            merged_items?.map(element => {
                data.rows.push(
                    {
                        id: order.id,
                        Numberofitem: element.quantity,
                        amount: `$${order.totalPrice}`,
                        status: "procesing",
                        // status: element.orderStatus && element.orderStatus.includes("delivered")?
                        // (<p style={{color:"green"}}>{element.orderStatus }</p>): (<p style={{color:"red"}}>{element.orderStatus }</p>),
                        action: <Link to={`/order/${ order.id}`} className='btn btn-primary'>
                            <i className='fa fa-eye'></i>
                        </Link>
                    }
                )
            });
        })
        return data
    }

    return (

        <div>
            {loading ? (
                <>
                    <Metadata title={"My Orders"} />
                    <h1 className='mt-5'>My Orders</h1>

                    <MDBDataTable className='px-3' bordered striped hover data={setOrder()} />
                </>
            )
                : <>
                    <h1 className='mt-5'>No Orders</h1>
                </>
            }

        </div>


    )
}
