const express = require("express");
const router = express.Router();

const {signUpUser, loginUser} = require("../../../controllers/api/v1/customer/Login.js");
const { createProfile, updateProfile, fetchProfile } = require("../../../controllers/api/v1/customer/customer.js");


// login || signup routes:
router.post("/user/login",loginUser);
router.post('/user/signup',signUpUser);

// profile routes:
router.post("/user/add-profile/:u_id",createProfile);
router.put("/user/update-profile/:u_id",updateProfile);
router.get('/user/profile/:u_id',fetchProfile);












module.exports = router;