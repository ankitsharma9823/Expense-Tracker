import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginLayout from "../src/Pages/LoginLayout"; // for login/register pages
import Layout from "./Layout";           // for main app with Navbar

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import AddExpense from "./Pages/AddExpense";
import Expensecard from "./components/Expensecard";
import AdminPanel from "./AdminPage/Adminpanel";
import AdminLayout from "./AdminLayout";
import AdminUser from "./AdminPage/AdminUser";
import AdminAddUser from "./AdminPage/AdminAddUser";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages without Navbar */}
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element = {<AdminLayout />}>
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/adminuser" element={<AdminUser />} />
        <Route path="/adduser" element={<AdminAddUser />}/>
        </Route>
        {/* Main app pages with Navbar */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addexpense" element={<AddExpense />} />
          <Route path="/allexpense" element={<Expensecard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
