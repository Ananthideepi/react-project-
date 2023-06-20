import React, { useEffect, useState } from 'react'
import { useSelector,   useDispatch  } from 'react-redux';
import { passwordupdateUser } from '../action/userloginaction';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/loader';
export default function Updatepassword() {
    const [password, setPassword] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const {user, error,isupdated} = useSelector((state) => state.authReducerState);
    const navigate = useNavigate();
//   console.log("updateuser",user[0].id)
    const dispatch=useDispatch()
    const submithandler = (e) => {
        e.preventDefault();
        // let formdata = new FormData();
        // formdata.append("password",password);
        // formdata.append("oldpassword",oldpassword);
        // console.log("oldpassword",oldpassword);
        // console.log("password",password);
        dispatch(passwordupdateUser({"password":password,"oldpassword":oldpassword},user[0].id))
    }
    useEffect(()=>{
 
        if (isupdated) {
            toast("Password update successfully",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                })
                setOldPassword("");
                setPassword("");
                navigate('/profile')
                return;
        } 
        if (error) {
            toast("Oldpassword is inCorrect",
                { 
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "error",
                })
                return;
        } 
    }, [isupdated,error,navigate,dispatch])
    return (
        <div>
            {user?(   <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submithandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldpassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>):(
                <Loader/>
            )}
          
        </div>
    )
}
