import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { profileupdateUser } from '../action/userloginaction';
import { toast } from "react-toastify";
import { clearupdateprofile } from '../slices/authenticateslice';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/loader';
export default function Updateprofile() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarpreview, setAvatarpreview] = useState("/images/icon.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user = [], error, isupdated } = useSelector((state) => state.authReducerState)

    const onChangeAvatar = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarpreview(reader.result)
                    setAvatar(e.target.files[0])
                    // console.log("its working") 
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    const submithandler = (e) => {
        e.preventDefault();
        // let  formdata = new FormData();
        // formdata.append("name", 'name');
        // formdata.append("email", userdata.email);
        // formdata.append("avatar", avatar);
        // console.log("avatar", formData);
        if (!name && !email && !avatar) {
            toast.error(" Please Enter the All Field ", { position: toast.POSITION.BOTTOM_CENTER })
            return;
        }
        dispatch(profileupdateUser({ name, email, avatar }, user[0].id))
    }
    useEffect(() => {
        if (user) {
            setName(user[0].name);
            setEmail(user[0].email);
            if (user[0].avatar) {
                setAvatarpreview(user[0].avatar);
            }
        }
        if (isupdated) {
            toast("Profile update successfully",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "success",
                    onOpen: () => {
                        dispatch(clearupdateprofile())
                    }
                })
            navigate('/profile')
            return;
        }
        if (error) {
            toast("Profile Update Failed",
                {
                    position: toast.POSITION.BOTTOM_CENTER,
                    type: "error",
                })
            return;
        }
    }, [user, isupdated, error, dispatch, navigate,])
    return (
        <div>
        {user? (
           
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data' onSubmit={submithandler}>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}

                                onChange={(e) => setEmail(e.target.value)}
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
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onChangeAvatar}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>

                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
       
        ):(
            <Loader /> 
        )}
        </div>
    )
}
