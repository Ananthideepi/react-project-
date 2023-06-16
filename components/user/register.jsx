import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { registeruser } from '../action/userloginaction';
export default function Registerform() {
    const [userdata, setUserdata] = useState(
        {
            name: "",
            password: "",
            email: ""
        }
    )
    const [avatar, setAvatar] = useState("")
    const [avatarpreview, setAvatarpreview] = useState("./images/icon.png")
    const dispath=useDispatch();
    const navigate= useNavigate();
    const { loading,error,isAuthenticate }=useSelector((state)=>state.authReducerState);

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload=()=>{
                if (reader.readyState === 2) {
                        setAvatarpreview(reader.result)
                        setAvatar(e.target.files[0])
                        // console.log("its working") 
                    }
            }
             reader.readAsDataURL(e.target.files[0])
            }
        else {
            setUserdata({ ...userdata, [e.target.name]: e.target.value })
            // console.log("userdata",userdata)
        }
    }
    useEffect(()=>{
        if (isAuthenticate) {
            navigate('/')
        }
        if (error) {
            toast.error("Please enter email and password and avatar pic", { position: toast.POSITION.BOTTOM_CENTER })
        }
        // or.........
        // if (error) {
        //     toast(error,
        //         {
        //             position: toast.POSITION.BOTTOM_CENTER,
        //             onOpen:() => { dispatch(clearerror) },
        //             type: "error",
        //         })
        // } 
        return;

    },[error,isAuthenticate,navigate])

    const submithandler = (e) => {
        e.preventDefault();
         if(!userdata.name && !userdata.email && !userdata.password){
            toast.error(" Please Enter the All Field ",{ position: toast.POSITION.BOTTOM_CENTER })
            return;
        }
      
            userdata.avatar=avatar;
            console.log("avatar", userdata);
            dispath(registeruser(userdata))
           
        // let formData = new FormData();    //formdata object
        // formData.append('name', 'ABC');   //append the values with key, value pair
        // formData.append('age', 20);
        // const formdata = new FormData();
        // formdata.append("name", 'name');
        // formdata.append("email", userdata.email);
        // formdata.append("password", userdata.password);
        // formdata.append("avatar", avatar);
        // console.log("avatar", formData);
       
    }
    return (
        <div>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submithandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input type="name" id="name_field" name="name" className="form-control" onChange={onChange} value={userdata.name} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email_field"
                                className="form-control"
                                value={userdata.email} onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password" name="password"
                                id="password_field"
                                className="form-control"
                                value={userdata.password} onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarpreview}
                                            className='rounded-circle'
                                            alt='imagepic'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                                   disabled={loading}
                                   >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
