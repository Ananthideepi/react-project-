import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetpasswordUser } from '../action/userloginaction';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
export default function Resetpassword() {
    const [password, setPassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const { isAuthenticate, error } = useSelector(state => state.authReducerState)
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const {token}=useParams();
    const handlesubmit = (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append(password);
        // formData.append(newpassword);
        if(password !== newpassword){
           
                toast("Password and confirm password does not matched",
                    {
                        position: toast.POSITION.BOTTOM_CENTER,
                        type: "error",
                    })
                    return;
        }else{

            dispatch(resetpasswordUser({password,newpassword},token));
        }

    
    };
    useEffect(() => {
        if (isAuthenticate) {
            toast("Password changed  successfully",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                })
            Navigate("/")
         return;
        } 
        if (error) {
            toast("Password Reset Failure",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "error",
                })
            return;
        }


    }, [error, isAuthenticate,Navigate,dispatch])
    return (
        <div><div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={handlesubmit}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={newpassword}
                            onChange={(e) => setNewpassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div></div>
    )
}
