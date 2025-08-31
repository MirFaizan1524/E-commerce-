const express  = require("express");
const router = express.Router(); 
const authenticateJWT = require("../../../helpers/adminauthentication.js"); 
const { addCategory,updateCategory,fetchCategory,fetchAllcategories,deleteCategory} = require("../../../controllers/api/v1/admin/Categories.js");
const { addProduct } = require("../../../controllers/api/v1/admin/Products.js");


// category routes:
router.post("/add-category",authenticateJWT,addCategory);
router.put('/update-category',authenticateJWT,updateCategory);
router.get('/category',authenticateJWT,fetchCategory)
router.get('/categories',authenticateJWT,fetchAllcategories);
router.delete('/delete-category',authenticateJWT,deleteCategory);


// Product routes:
router.post('/add-product',authenticateJWT,addProduct);

module.exports = router;