import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loader from '../layout/loader';

export default function Productroutes({ children, isAdmin }) {

    const { isAuthenticate, loading, user } = useSelector(state => state.authReducerState);
// console.log("isadmin",isAdmin )
// console.log("isadmin",user )
    if (!isAuthenticate && !loading) {
        return <Navigate to="/login" />
    }
    if (isAuthenticate) {
        if (isAdmin === true && user[0].role !== "admin") {
            return <Navigate to="/" />
        }
        return children;
    }
    if (loading) {
        return <Loader />
    }
}
