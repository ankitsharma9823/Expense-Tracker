import React, { useEffect, useState } from 'react'
import axios from 'axios';

const AdminCard = () => {
  const [total, setTotal] = useState(0);
  const totaluser = async () =>{
    try {
      const response = await axios.get("http://localhost:3000/api/auth/getuser");
      setTotal(response.data.length);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    totaluser();
  })
  return (
    <div className="flex flex-col items-start w-1/2 gap-2 bg-gray-100 p-3 rounded-md shadow-sm">
      <h3 className="text-gray-700 font-bold text-lg">Total Users:</h3>
      <span className="text-blue-600 font-bold">{total}</span>
    </div>

  )
}

export default AdminCard