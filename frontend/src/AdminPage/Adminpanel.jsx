import React from 'react';
import AdminCard from '../Admin Components/AdminCard';
import { useNavigate } from 'react-router-dom';

const Adminpanel = () => {
  const navigate = useNavigate();

  const adduser = () => {
    navigate("/adduser");
  };

  return (
    <div className="mt-3 w-full px-4">

      {/* Header */}
      <div className="flex sm:items-center justify-between w-full items-center right-0">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <button
          onClick={adduser}
          className="bg-blue-500 mx-2 text-white px-5 py-2 rounded-md
                     hover:bg-blue-600 transition shadow-md
                     w-full sm:w-auto"
        >
          + Add User
        </button>
      </div>
      <div className='mt-5'>
      <AdminCard />
      </div>
    </div>
  );
};

export default Adminpanel;
