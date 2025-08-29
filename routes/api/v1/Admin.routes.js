const express  = require("express");
const router = express.Router(); 
const authenticateJWT = require("../../../helpers/customerauthentication.js"); 
const { addCategory } = require("../../../controllers/api/v1/admin/Categories.js");


// category routes:
router.post("/add-category",authenticateJWT,addCategory);


module.exports = router;