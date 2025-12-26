import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, BadgeDollarSign, LogOut, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAccountOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-5">
          <button onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <BadgeDollarSign size={30} className="text-blue-900" />
            <span className="font-bold text-xl hidden sm:block">
              Expense Tracker
            </span>
            <span className="font-bold text-xl sm:hidden">ET</span>
          </Link>
        </div>

        {/* Right */}
        <div className="relative">
          <button
            onClick={() => setAccountOpen(!accountOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-full"
          >
            <User size={18} />
            <span className="hidden sm:block">Account</span>
          </button>

          {accountOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow">
              <Link
                to="/profile"
                onClick={() => setAccountOpen(false)}
                className="block px-4 py-3 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-3 text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar (NO black background now) */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="mt-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-4 hover:bg-blue-50"
          >
            Dashboard
          </Link>
          <Link
            to="/addexpense"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-4 hover:bg-blue-50"
          >
            Add Expenses
          </Link>
          <Link
            to="/allexpense"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-4 hover:bg-blue-50"
          >
            Expenses
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
