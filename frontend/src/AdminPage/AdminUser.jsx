import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminUser = () => {
  const [userDetail, setUserDetail] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [confirmModal, setConfirmModal] = useState({ show: false, userId: null });
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/getuser");
      setUserDetail(response.data);
      setTotalUser(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setTotalUser(userDetail.length);
  }, [userDetail]);

  // Open confirmation modal
  const openConfirmModal = (_id) => {
    setConfirmModal({ show: true, userId: _id });
  };

  // Close modal
  const closeConfirmModal = () => {
    setConfirmModal({ show: false, userId: null });
  };

  // Delete user
  const deleteUser = async () => {
    try {
      const _id = confirmModal.userId;
      await axios.delete(`http://localhost:3000/api/auth/deleteuser/${_id}`);
      setUserDetail(userDetail.filter((user) => user._id !== _id));
      closeConfirmModal();

      // If deleted user is the current logged-in user, logout
      const currentUserId = localStorage.getItem("userId"); // store userId when login
      if (_id === currentUserId) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6 px-2 sm:px-4 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 w-full">
  <h3 className="text-2xl font-bold text-gray-800">User Details</h3>
  <span className="mt-2 sm:mt-0 text-gray-700 font-medium">
    Total Users: <span className="text-blue-600">{totalUser}</span>
  </span>
</div>

      {/* Table */}
      <div className="overflow-x-auto w-full rounded-md shadow">
        <table className="min-w-full w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">Username</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">Email</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">Phone</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">Role</th>
              <th className="py-3 px-4 text-left text-gray-700 font-medium border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {userDetail.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => openConfirmModal(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-80 max-w-full">
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUser;
