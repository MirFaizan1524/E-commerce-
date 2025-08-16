const express = require("express");
const router = express.Router();

const {signUpUser, loginUser} = require("../../../controllers/api/v1/customer/Login.js");


// login || signup routes:
router.post("/user/login",loginUser);
router.post('/user/signup',signUpUser);














module.exports = router;