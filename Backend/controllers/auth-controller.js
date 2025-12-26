const User = require("../models/login-models");
const expense = require("../models/expense-model");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).send({ msg: "Please Register" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Password does not match" });
    }

    const token = userExist.generateToken();

    // Include user info for frontend
    res.status(200).send({
      msg: "Login Successfully",
      token,
      user: {
        _id:userExist._id,
        username: userExist.username,
        email: userExist.email,
        role: userExist.role, 
      },
    });
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};


const register = async (req, res) => {
    try {
        console.log("Body received:",req.body)
        const { username, email, password, phone, role } = req.body; // get image if sent

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409).json({ msg: "User already existed" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            username,
            email,
            password: hashPassword,  // save hashed password
            phone,
            role: role || "user",           // normal user
        });
        await user.save();
        res.status(201).json({ msg: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};
const addexpense = async (req, res) => {
   try {
        const { title, category, amount, date} = req.body;
        const newexpense = await expense.create({ title, category, amount, date})
        res.status(200).json({expense});
   } catch (error) {
        console.log(error);
        res.status(400).json({msg:"internal server error",error});
   }
}
const getexpense = async (req, res) =>{
    try {
        const newexpense = await expense.find();
        res.status(200).send(newexpense)
    } catch (error) {
        res.status(400).send({msg:"Internal server error at get expense"});
    }
}
const deleteexpense = async (req, res) => {
  try {
    const id = req.params.id; // get id from URL

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const deletedExpense = await expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error); // log error
    return res.status(500).json({ message: "Server error" });
  }
};
const getcurrentMonthTotal = async (req, res) => {
  try {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const expenses = await expense.find({
      createdAt: { $gte: startDate, $lt: endDate }
    });

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.status(200).json({
      month: now.toLocaleString("default", { month: "long" }),
      total
    });
  } catch (error) {
    console.error("Error calculating monthly total:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
const getTotalTransaction = async (req, res) => {
  try {
    // Get all expenses
    const expenses = await expense.find();

    // Sum all amounts
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    res.status(200).json({ total });
  } catch (error) {
    console.error("Error calculating total transactions:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
const addUserByAdmin = async (req, res) => {
  try {
    const { username, email, password, phone, role } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Required field missing" });
    }

    // Check existing user
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ msg: "User already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      username,
      email,
      password: hashPassword,
      phone,
      role: role || "user",
      isActive: true
    });

    res.status(201).json({ msg: "User added successfully" });
  } catch (error) {
    console.log("add user error")
    res.status(500).json({ msg: "Internal server error" });
  }
};
const allUser = async (req,res) =>{
  try {
    const getUser = await User.find();
    res.status(200).json(getUser);
  } catch (error) {
    
  }
};
const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params; // match the route
    if (!_id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


module.exports = { login,register,addexpense, getexpense, deleteexpense, getcurrentMonthTotal, getTotalTransaction, addUserByAdmin, allUser, deleteUser };