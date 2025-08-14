const app  = require('./app.js');
require('dotenv').config();
const db = process.env.DB_NAME;
const portNumber =  process.env.PORT_NUMBER || 3000;
// console.log(db)
app.listen(portNumber,()=>{
console.log(`Listening to the port ${portNumber}`);
})