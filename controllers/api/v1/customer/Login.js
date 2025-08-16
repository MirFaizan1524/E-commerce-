const User = require("../../../../models/users.model.js");
const jwt = require('jsonwebtoken');
const loginUser = async(req,res)=>{
  try{
   
    const {email,password} = req.body;
    
      if(!email || !password){
          return res.status(401).json({
            success:false,
            Message:"All fields are required"
          })
      }
      // checking the existence of user:
      const user = await User.findOne({email:email});
       if(!user){
         return res.status(401).json({
            success:false,
            Message:"User do not Exists Kindly Signup!"
         })
       }

    // verifying users password:
      const verifiedPassword = await user.isPasswordCorrect(password);
        if(!verifiedPassword){
           return res.status(401).json({
            success:false,
            message:"Please enter valid password"
           })           
        }                
     
       // generating jwt token for further authentication of routes:
       const token = await jwt.sign({user:user._doc},process.env.SECRET_KEY,{expiresIn:"1d"});
      //   console.log("Token generated",token);
       const userPayload={
         email:user.email,
         role:user.role,   
       }
        if(token){
            return res.status(201).json({
               success:true,
               Message:"User logged In successfully",
               User:userPayload,
               token:token
            })

        }   
      
   }catch(error){
       console.log("Error occured in customer login",error);  
       return res.status(401).json({
         success:false,
         Message:"Error Occured while login"
       }) 

   }





}
const signUpUser = async(req,res)=>{
   try{
       const {email,password,phoneNumber,address,role} = req.body;
      //  console.log(req.body);
       if(!email || !password || !phoneNumber){
         return res.status(401).json({
            success:false,
            Message:"All fields are required"
         })       
       }
       // Checking for existing User:
      const existingUser = await User.findOne({email:email});
      if(existingUser){
          return res.status(401).json({
            success:false,
            Message:"User already exists please Login"
         })

      }
      // Creating a new User:
      const user = await new User({
        email:email,
        password:password,
        phoneNumber:phoneNumber,
        address:address,
        role:role
      }).save();
    console.log("created user",user);      
      if(!user){
         return res.status(401).json({
         success:false,
         message:"User was not created"
      })
      
      }else{
         return res.status(201).json({
         success:true,
         message:"User created successfully!",
         user:{
            _id:user._id,
            email:user.email
         }
      })


      }
      
   }
   catch(error){
      console.log("Error occured while signing up user",error);
      return res.status(401).json({
         success:false,
         message:"Error Occured while signup user!"
      })

   }

}

module.exports = {signUpUser,loginUser};