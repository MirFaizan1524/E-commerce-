const express  = require("express");
const router = express.Router(); 
const authenticateJWT = require("../../../helpers/adminauthentication.js"); 
const { addCategory,updateCategory,fetchCategory,fetchAllcategories,deleteCategory} = require("../../../controllers/api/v1/admin/Categories.js");
const { addProduct, updateProduct, getSingleProduct, fetchAllproducts, deleteProduct } = require("../../../controllers/api/v1/admin/Products.js");


// category routes:
router.post("/add-category",authenticateJWT,addCategory);
router.put('/update-category',authenticateJWT,updateCategory);
router.get('/category',authenticateJWT,fetchCategory)
router.get('/categories',authenticateJWT,fetchAllcategories);
router.delete('/delete-category',authenticateJWT,deleteCategory);


// Product routes:
router.post('/add-product',authenticateJWT,addProduct);
router.put('/update-product',authenticateJWT,updateProduct);
router.get("/product",authenticateJWT,getSingleProduct);
router.get('/products',authenticateJWT,fetchAllproducts);
router.delete('/product',authenticateJWT,deleteProduct);

module.exports = router;