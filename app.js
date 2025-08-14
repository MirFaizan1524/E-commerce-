const express = require('express');
const app = express();




// Middlewares to parse JSON:
 app.use(express.json());
 app.use(express.urlencoded({extended:true})); 




// possible routes:

app.get('/',(req,res)=>{

res.send("Hi welcome to the ecommerce web app");

})


module.exports = app;
