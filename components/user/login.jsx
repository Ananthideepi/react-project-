import React, { useEffect, useState } from 'react'
import Metadata from '../layout/Metadata'
import { useDispatch, useSelector } from 'react-redux';
import {
    //  clearLoginuserError,
    loginuser
} from '../action/userloginaction';
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [passwwrd, setpassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, error, isAuthenticate } = useSelector((state) => state.authReducerState);
    const redirect = location.search? "/" + location.search.split("=")[1] : "/";
    // console.log("authReducerState", error, loading)

    const submithandler = (e) => {
        e.preventDefault();
        if (!email && !passwwrd) {
            toast.error(" Please Enter the Email and Password ", { position: toast.POSITION.BOTTOM_CENTER })
            return;
        }
        dispatch(loginuser(email, passwwrd))
    }

    useEffect(() => {
        if (isAuthenticate) {
            navigate(redirect);
            // navigate('/')
        }
        if (error) {
            toast.error("Email and Password is Incorrect", { position: toast.POSITION.BOTTOM_CENTER })
        }
        // or.........
        // if (error) {
        //     toast("Email and Password is Incorrect",
        //         {
        //             position: toast.POSITION.BOTTOM_CENTER,
        //             onOpen:() => { dispatch(clearLoginuserError) },
        //             type: "error",
        //         })
        // } 
        return;
    }, [error, isAuthenticate, navigate, redirect])

    return (
        <>
            <Metadata title={`login form`} />
            <div className="row wrapper">

                <div className="col-10 col-lg-5">
                    <form className="shadow-lg " onSubmit={submithandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={passwwrd}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                        </div>

                        <Link to="/password/forget" className="float-right mb-4">Forgot Password?</Link>
                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            LOGIN
                        </button>
                        <Link to="/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
