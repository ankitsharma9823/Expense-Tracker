import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

const AddExpense = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/addExpense", data);

            // Only reset form after successful addition
            toast.success("Expense Added Successfully");
            reset({
                title: "",
                amount: "",
                category: "",
                date: ""
            });

        } catch (err) {
            setError(
                err.response?.data?.msg || 
                "Failed to add expense. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center flex-col items-center w-full min-h-screen bg-gray-50 p-6">
            <div className="text-center max-w-xl mb-8">
                <h1 className="font-bold text-3xl font-serif mb-4 text-gray-800">
                    Add Expense
                </h1>
                <p className="text-lg font-sans text-gray-600">
                    Keep your budget under control! Add your expenses below to track where your money goes each month.
                </p>
            </div>

            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Title:</label>
                        <input
                            className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Expense Title"
                            disabled={loading}
                            {...register("title", { required: "Please write the expense title" })}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Amount ($):</label>
                        <input
                            className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            disabled={loading}
                            {...register("amount", { 
                                required: "Please mention the amount",
                                min: { value: 0.01, message: "Amount must be greater than 0" }
                            })}
                        />
                        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Category:</label>
                        <input
                            className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Food, Travel, etc."
                            disabled={loading}
                            {...register("category", { required: "Please mention the category" })}
                        />
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-700">Date:</label>
                        <input
                            className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="date"
                            disabled={loading}
                            {...register("date", { required: "Please mention the expense date" })}
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-4 font-semibold py-2 rounded-lg transition-colors flex items-center justify-center ${
                            loading 
                                ? "bg-blue-400 cursor-not-allowed text-white" 
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </>
                        ) : (
                            "Add Expense"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddExpense;
