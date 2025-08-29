require('dotenv').config();
const jwt = require('jsonwebtoken');
const User =  require("../models/user.model.js");

const authenticateJWT = async(req,res,next)=>{
   let authToken = req.headers.authorization;
   let confirmToken = authToken.startsWith('Bearer');
   if(!authToken || !confirmToken){
     return res.status(401).json({
      success:false,
      Message:"Un-authorized Access Please login first"
     })

   }
     if(confirmToken){
  
    let Token =  authToken.split(' ')[1];                  
   
     let decodeToken  = jwt.verify(Token,process.env.SECRET_KEY);      
      
       if(decodeToken.user.role=="admin"){
         return res.status(403).json({
            success:false,
            Message:"Only customer has access to this resource"
         })
       } 
         if(decodeToken){

          
         let user = await User.findById({_id:decodeToken.user._id});
          if(!user){
           return res.status(419).json({
            success:false,
            Message:"Token expired try to login again!"
           }) 

          } 
          req.user = decodeToken?decodeToken:null
          next();      
          }  
     }
   

}
module.exports = authenticateJWT;