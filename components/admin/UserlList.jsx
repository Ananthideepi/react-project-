import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../layout/loader';
import Sidebar from './sidebar'
import { MDBDataTable } from 'mdbreact'
import { clearError } from '../slices/orderslice';
import { clearUserDelete } from '../slices/adminAccessUserslice';
import { DeleteUserAction, GetUsersAction } from '../action/userloginaction';

export default function UserList() {
    const { loading = true,  Users: [], error, isuserDeleted } = useSelector((state) => state.adminUserReducerState);
    const dispatch = useDispatch();
    const{ Users=[]}=useSelector((state)=>state.adminUserReducerState)
    const setUsers = () => {
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
                    label: "Email",
                    field: "email",
                    sort: "asc"
                }, {
                    label: "Role",
                    field: "role",
                    sort: "asc"
                }, {
                    label: "Action",
                    field: "action",
                    sort: "asc"
                }
            ],
            rows: []
        }

        Users.forEach((item) => {
            data.rows.push({
                id: item.id,
                name: item.name,
                email: item.email,
                role: item.role,
                action: (
                    <><Button>
                        <Link to={`/admin/user/${item.id}`} className='"btn btn-primary'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                    </Button>
                        <Button onClick={(e) => deleteHandler(e, item.id)} className='btn btn-danger py-1 px-2 ml-2'>
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
        dispatch(DeleteUserAction(id))

    }
    useEffect(() => {
        if (isuserDeleted) {
            toast("User Deleted successfully",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                    onOpen: () => {
                        dispatch(clearUserDelete());
                    }

                })
            return;
        }
        if (error) {
            toast("Error in user Delete", {
                position: toast.POSITION.BOTTOM_CENTER,
                type: "error",
                onOpen: () => {
                    dispatch(clearError())
                }
            })
            return
        }
        dispatch(GetUsersAction)
    }, [dispatch, error, isuserDeleted])
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

                            <MDBDataTable className='px-3' bordered striped hover data={setUsers()} />

                        }
                    </>

                </div>

            </div>



        </div>
    )
}
