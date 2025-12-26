const express = require("express");
const verifyToken = require("../middleware/authmiddleware")
const router = express.Router();
const authorizeRole = require("../middleware/rolemiddleware")

router.get("/admin",verifyToken, authorizeRole("admin"), (req, res) =>{
    res.json({ msg: "Welcome admin"});
});
router.get("/user",verifyToken, authorizeRole("user","admin"), (req, res) =>{
    res.json({ msg: "Welcome user"})
});

module.exports = router;