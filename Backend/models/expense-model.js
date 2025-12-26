const mongoose = require("mongoose");

const expenseschema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            required: true,
            type: String,
        },
        amount: {
            required: true,
            type: Number,
        },
        date: {
            required: true,
            type: Date,
        },
    },
    {
        timestamps: true,
    }
)

const expense = mongoose.model("Expense", expenseschema)

module.exports = expense;