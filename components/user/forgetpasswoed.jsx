import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { forgetpasswordUser } from '../action/userloginaction';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export default function Forgetpasswoeds() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message,reset,
        //  loading,
        user, error } = useSelector(state => state.authReducerState)
    const submithandler = (e) => {
        e.preventDefault();
        // const formata = new FormData();
        // formata.append(email);
        dispatch(forgetpasswordUser(email))
    }
    useEffect(() => {
        if (message && reset) {
            toast(`Email send to ${email} `,
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                })
            setEmail("");
            navigate(`/password/reset/${user[0].id}`);
            return;
        }
        if (error) {
            toast("User not found this Email",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "error",
                })
            return;
        }
    }, [message, error,user,email,navigate,reset, dispatch])
    return (
        <div>	<div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submithandler}>
                    <h1 className="mb-3">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Send Email
                    </button>

                </form>
            </div>
        </div></div>
    )
}
