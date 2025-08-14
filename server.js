const app  = require('./app.js');
require('dotenv').config();
const connectDB = require("./config/db.js");    

  connectDB().then(()=>{
    console.log("DB connected");       
  }).catch((err)=>{
    console.log("Error occured while connecting to database");
  })  




const portNumber =  process.env.PORT_NUMBER || 3000;
// console.log(db)
app.listen(portNumber,()=>{
console.log(`Listening to the port ${portNumber}`);
})