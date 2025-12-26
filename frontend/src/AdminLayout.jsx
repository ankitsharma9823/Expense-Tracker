import React from 'react'
import AdminNavbar from './AdminPage/AdminNavbar'
import { Outlet, Navigate } from 'react-router-dom'

const AdminLayout = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if(!token){
    return <Navigate to = "/" replace />;
  };
  if(role != "admin"){
    return <Navigate to = "/dashboard" replace />;
  };
  
  return (
    <div className='flex gap-10'>
        <AdminNavbar />
        
        <Outlet />
    </div>
  )
}

export default AdminLayout