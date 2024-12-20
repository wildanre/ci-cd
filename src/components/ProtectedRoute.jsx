/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(sessionStorage.getItem('user'));


    if (!user) {
        return <Navigate to="/login" replace />;
    }


    if (user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }


    return children;
};

export default ProtectedRoute;
