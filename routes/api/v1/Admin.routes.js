const express  = require("express");
const router = express.Router(); 
const authenticateJWT = require("../../../helpers/adminauthentication.js"); 
const { addCategory,updateCategory,fetchCategory} = require("../../../controllers/api/v1/admin/Categories.js");


// category routes:
router.post("/add-category",authenticateJWT,addCategory);
router.put('/update-category',authenticateJWT,updateCategory);
router.get('/category',authenticateJWT,fetchCategory)


module.exports = router;