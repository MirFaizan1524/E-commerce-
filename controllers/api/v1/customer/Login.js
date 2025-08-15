const User = require("../../../../models/users.model.js");


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

module.exports = {signUpUser};