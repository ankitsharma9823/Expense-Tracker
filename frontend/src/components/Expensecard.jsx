import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash, Plus } from "lucide-react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Expensecard = () => {
  const [expense, setExpense] = useState([]);
  const navigate = useNavigate();

  const getdata = async () =>{
    const response = await axios.get("http://localhost:3000/api/auth/getexpense/")
    setExpense(response.data);
  }

  useEffect(()=>{
    getdata();
  },[]);
  
  const expensedelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/auth/deleteexpense/${id}`)
    toast.success("Deleted successfully");
    getdata();
  }

  const showAddExpense = () =>{
    navigate("/addexpense");
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Recent Expenses
        </h2>

        <button
          onClick={showAddExpense}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 
                     text-white px-5 py-2 rounded-full font-semibold 
                     shadow-md transition-all w-fit"
        >
          <Plus size={20} strokeWidth={3} />
          Add Expense
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-4 px-6 text-left text-gray-600 font-semibold">Title</th>
              <th className="py-4 px-6 text-left text-gray-600 font-semibold">Category</th>
              <th className="py-4 px-6 text-left text-gray-600 font-semibold">Date</th>
              <th className="py-4 px-6 text-left text-gray-600 font-semibold">Amount</th>
              <th className="py-4 px-6 text-center text-gray-600 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {expense.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}

            {expense.map((item) => (
              <tr
                key={item.id || item._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-6 font-medium text-gray-800">
                  {item.title}
                </td>

                <td className="py-4 px-6 text-gray-600">
                  {item.category}
                </td>

                <td className="py-4 px-6 text-gray-500">
                  {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                </td>

                <td className="py-4 px-6 font-semibold text-red-500">
                  ${item.amount || 0}
                </td>

                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => expensedelete(item._id)}
                    className="p-2 rounded-full hover:bg-red-100 
                               text-red-600 transition"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Expensecard
