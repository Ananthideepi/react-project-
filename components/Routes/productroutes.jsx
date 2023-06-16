import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loader from '../layout/loader';

export default function Productroutes({ children }) {
    
    const { isAuthenticate, loading } = useSelector(state => state.authReducerState);

    if (!isAuthenticate && !loading) {
        return <Navigate to="/login" />
    }
    if (isAuthenticate) {
        return children; 
    }
    if (loading) {
        return <Loader />
    }
}
