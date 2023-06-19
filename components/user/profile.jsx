import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from "moment"
export default function Profile() {
    const { user } = useSelector(state => state.authReducerState)
    console.log("user", user)

    return (
        <div>
            <div className="row justify-content-around mt-5 user-info">
                <div className="col-12 col-md-3">
                    <figure className='avatar avatar-profile'>
                        <img className="rounded-circle img-fluid" src={user[0].avatar ?? "./images/icon.png"} alt='' />
                    </figure>

                    <Link to="/profile/update/profile" id="edit_profile" className="btn btn-primary btn-block my-5">
                        Edit Profile
                    </Link>
                </div>

                <div className="col-12 col-md-5">
                    <h4>Full Name</h4>
                    <p>{user[0].name}</p>

                    <h4>Email Address</h4>
                    <p>{user[0].email}</p>

                    <h4>Joined</h4>
                    <p>{moment(user[0].createdAt.toDate()).calendar()}</p>


                    <Link to="/order" className="btn btn-danger btn-block mt-5">
                        My Orders
                    </Link>
                    <Link to="/profile/update/password" className="btn btn-primary btn-block mt-3">
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    )
}
