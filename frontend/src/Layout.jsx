import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Toaster
        position="top-right"    // change position
        reverseOrder={false}
        toastOptions={{
          duration: 2000,          // show for 3 seconds
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
