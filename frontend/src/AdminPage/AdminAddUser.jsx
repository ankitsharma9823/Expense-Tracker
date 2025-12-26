import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

const AdminAddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/auth/adduseradmin", data);
      navigate("/adminpanel");
    } catch (error) {
      setSubmitError("Failed to add user: " + (error.response?.data?.message || error.message));
    }
  };

  const goBack = () => {
    navigate("/adminpanel");
  };

  return (
    <div className='flex flex-col h-screen items-center justify-center w-full bg-gray-100'>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className='mb-2fixed cursor-pointer flex items-center gap-1 hover:text-blue-500' onClick={goBack}><ArrowLeft />Go Back</h1>
        <h1 className="text-2xl font-bold mb-6 text-center">Add New User</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Username:</label>
            <input
              type="text"
              {...register("username", {
                required: "Please enter your Username",
              })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              {...register("email", {
                required: "Please enter a valid email",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Phone:</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Please enter your phone number",
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Invalid phone number",
                },
              })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              {...register("password", {
                required: "Please enter a password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Role:</label>
            <select
              {...register("role", {
                required: "Please select a role",
              })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>
          <div>
            <input
              type="submit"
              value="Add User"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer"
            />
          </div>
        </form>
        {submitError && <p className="text-red-500 text-center mt-4">{submitError}</p>}
      </div>
    </div>
  );
};

export default AdminAddUser;