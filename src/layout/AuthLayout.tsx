import React from 'react'
import { useAuth } from '../services/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
    const user = useAuth()
    if (user?.token && user?.isUser) {
        return <Navigate to="/role" replace />;
    }
    return (
        <Outlet />
    )
}

export default AuthLayout