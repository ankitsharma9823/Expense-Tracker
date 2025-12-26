import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Plus, Activity, DollarSign, CreditCard, ListChecks } from 'lucide-react';
import Card from '../components/card';
import { data, useNavigate } from 'react-router-dom';
import Expensecard from '../components/Expensecard';
import axios from 'axios';

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [monthTotal, setMonthTotal] = useState({ month: '', total: 0 }); // Added state
  const [totalTrans, setTotalTrans] = useState(0);
  const MonthlySpending = async () =>{
    try {
      const response = await axios.get("http://localhost:3000/api/auth/monthlyspending");
      const data = response.data;
      setMonthTotal(data);
    } catch (error) {
      console.log("frontend error", error);
    }
  }

  useEffect(() => {
     MonthlySpending();// Call it when component mounts
  }, []);

  const showAddExpense = () => {
    navigate("/addExpense")
  }
  const totaltransaction = async () =>{
    try {
      const response = await axios.get("http://localhost:3000/api/auth/totaltransaction");
      setTotalTrans(response.data.total);
      console.log(response.data);
    } catch (error) {
      console.log("error",error);
    }
  }
  useEffect(()=>{
    totaltransaction();
  }, [])

  return (
    <>
      <div className='overflow-hidden flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-10 py-4 gap-4 md:gap-0'>
        <div>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>
            Dashboard
          </h1>
          <p className='text-sm sm:text-base md:text-lg text-gray-600'>
            Welcome back! Here's your spending overview
          </p>
        </div>

        <button 
          className='px-2 sm:px-4 py-2 bg-blue-700 hover:bg-violet-600 rounded-3xl text-white 
                     font-bold flex items-center justify-center 
                     text-sm sm:text-base md:text-lg gap-2'
          onClick={showAddExpense}
        >
          <Plus size={20} strokeWidth={3} /> Add Expense
        </button>
      </div>

      <div className="flex flex-col gap-6 px-4 sm:px-6 md:px-10 py-10">
        <div className='flex flex-col md:flex-row gap-5 w-full'>
          <Card 

            title={`Monthly Spending - ${monthTotal.month}`} 
            price={`$${monthTotal.total.toFixed(2)}`} 
            image={<DollarSign size={24} />} 
          />
          <Card 
            title="Total Transaction" 
            price={`$${(Number(totalTrans) || 0).toFixed(2)}`} 
            image={<Activity size={24} />} 
          />
        </div>

        <div>
          <Expensecard />
        </div>
      </div>
    </>
  )
}

export default Dashboard;
