const express = require("express");
const router = express.Router();

const {signUpUser, loginUser} = require("../../../controllers/api/v1/customer/Login.js");
const { createProfile, updateProfile, fetchProfile } = require("../../../controllers/api/v1/customer/customer.js");
const authenticateJWT = require("../../../helpers/customerauthentication.js");
const { addToCart, deleteProductFromCart } = require("../../../controllers/api/v1/customer/Cart.js");

// login || signup routes:
router.post("/login",loginUser);
router.post('/user/signup',signUpUser);

// profile routes:
router.post("/add-profile/:u_id",createProfile);
router.put("/update-profile/:u_id",updateProfile);
router.get('/profile/:u_id',fetchProfile);

// cart routes:
router.post("/add-cart",authenticateJWT,addToCart);
router.delete("/remove-cart",authenticateJWT,deleteProductFromCart);












module.exports = router;