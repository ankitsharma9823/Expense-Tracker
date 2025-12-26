require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authroute = require("./Route/auth-route");
const connectDb = require("./utils/db");
const userroute = require("./Route/userRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authroute);
app.use("/api/user", userroute);
const Port = process.env.Port;
connectDb().then(()=>{
    app.listen(Port,()=>{
    console.log(`server is running on ${Port}`);
});
})
