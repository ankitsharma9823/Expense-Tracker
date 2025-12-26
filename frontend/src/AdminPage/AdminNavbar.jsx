import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="h-screen w-64 bg-slate-900 text-white sticky top-0">
      <div className="flex flex-col h-full px-4 py-6">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-8 text-center border-b border-slate-700 pb-4">
          Admin Panel
        </h1>

        {/* Links */}
        <nav className="flex flex-col gap-4 grow">
          <Link
            to="/Adminpanel"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Home
          </Link>

          <Link
            to="/Adminuser"
            className="px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Users
          </Link>
        
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-auto bg-red-600 hover:bg-red-700 py-2 rounded-lg transition font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminNavbar
