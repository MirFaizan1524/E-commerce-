const express = require('express');
const app = express();
const cusomterRoutes = require("../backend/routes/api/v1/Customer.routes.js");



// Middlewares to parse JSON:
 app.use(express.json());
 app.use(express.urlencoded({extended:true})); 




// possible routes:
// Mock route:
app.get('/',(req,res)=>{

res.send("Hi welcome to the ecommerce web app");

})
// Customer Routes:
app.use("/api/v1",cusomterRoutes);   


module.exports = app;
