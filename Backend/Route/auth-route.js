const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");

router.route("/login").post(authcontroller.login);
router.route("/register").post(authcontroller.register);
router.route("/addexpense").post(authcontroller.addexpense);
router.route("/getexpense").get(authcontroller.getexpense);
router.route("/deleteexpense/:id").delete(authcontroller.deleteexpense);
router.route("/monthlyspending/").get(authcontroller.getcurrentMonthTotal);
router.route("/totaltransaction").get(authcontroller.getTotalTransaction);
router.route("/adduseradmin").post(authcontroller.addUserByAdmin);
router.route("/getuser").get(authcontroller.allUser);
router.route("/deleteuser/:_id").delete(authcontroller.deleteUser);
module.exports = router;