import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { updateProductAction } from '../action/productsaction';
import productslice, { clearError, } from '../slices/productslice';
import { clearupdateProduct } from '../slices/productsSlice';
import { toast } from "react-toastify";
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../layout/loader';
import { clearUserUpdate } from '../slices/adminAccessUserslice';
import { GetUserAction, updateUserAction } from '../action/userloginaction';
export default function UpdateUser() {

    const formRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const { id } = useParams();
    const { loading = true, error,user=[] ,getUserdata="false", isuserupdated, } = useSelector((state) => state.adminUserReducerState);
    const { Users = [] } = useSelector((state) => state.adminUserReducerState);
    // const user = Users.filter((orderItem) => orderItem.id === id)
    console.log("user,",user)
    const { user: authuser } = useSelector((state) => state.authReducerState);
    const dispatch = useDispatch();



    const submitHandler = (e) => {
        e.preventDefault();
        if (name !== "" && email !== "" && role !== "") {
            dispatch(updateUserAction(id, { name, role, email }))
        }
        else {
            toast("Please Fill All The Field",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "warning",
                })
        }
    }

    useEffect(() => {
        if (isuserupdated) {
            toast("User Updated successfully",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                    onOpen: () => {
                        dispatch(clearUserUpdate());
                    }
                })

            return;
        }
        if (error) {
            toast("User  update Failed",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "error",
                    onOpen: () => {
                        dispatch(clearError())
                    }
                })
            return;
        }
        dispatch(GetUserAction(id))
       
    }, [isuserupdated, error, dispatch,id])

    useEffect(() => {
      if(getUserdata){
            if (user) {
                setName(user[0].name);
                setEmail(user[0].email);
                setRole(user[0].role);
            }
        }
    }, [user,getUserdata])

    return (
        <div>

            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>

                    <>
                        {loading ?
                            <Loader /> :
                            <>
                                <div className="wrapper my-5">
                                    <form className="shadow-lg" ref={formRef} encType='multipart/form-data' onSubmit={submitHandler}>
                                        <h1 className="mb-4">Update User</h1>

                                        <div className="form-group">
                                            <label htmlFor="name_field">Name</label>
                                            <input
                                                type="text"
                                                id="name_field"
                                                className="form-control"
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="price_field">Email</label>
                                            <input
                                                type="text"
                                                id="price_field"
                                                className="form-control"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </div>



                                        <div className="form-group">

                                            <label htmlFor="category_field">Role</label>
                                            <select
                                                 disabled={getUserdata && user[0].id === authuser[0].id}
                                                value={role} onChange={e => setRole(e.target.value)}
                                                className="form-control" id="category_field">
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                        </div>




                                        <button
                                            id="login_button"
                                            type="submit"
                                            disabled={loading}
                                            className="btn btn-block py-3"
                                        >
                                            UPDATE
                                        </button>

                                    </form>
                                </div>
                            </>
                        }
                    </>

                </div>

            </div>


        </div>
    )
}