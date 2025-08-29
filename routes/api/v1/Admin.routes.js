const express  = require("express");
const router = express.Router(); 
const authenticateJWT = require("../../../helpers/adminauthentication.js"); 
const { addCategory,updateCategory,fetchCategory,fetchAllcategories,deleteCategory} = require("../../../controllers/api/v1/admin/Categories.js");


// category routes:
router.post("/add-category",authenticateJWT,addCategory);
router.put('/update-category',authenticateJWT,updateCategory);
router.get('/category',authenticateJWT,fetchCategory)
router.get('/categories',authenticateJWT,fetchAllcategories);
router.delete('/delete-category',authenticateJWT,deleteCategory);

module.exports = router;