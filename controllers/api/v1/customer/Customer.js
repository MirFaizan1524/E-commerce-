const Profile = require("../../../../models/profile.model.js");
const mongoose  = require("mongoose");

// create profile:

const createProfile = async(req,res)=>{
   try{
      const {firstName,lastName,avatar,coverImage} = req.body;
      const u_id = req.params.u_id;
        if(!u_id){
        return res.status(403).json({
            success:false,
            message:"User ID is required"
        })    
        }
      // we will do only validations for firstName:
       if(!firstName){
        return res.status(403).json({
            success:false,
            message:"First name is required"
        })
       } 
      
       if(!mongoose.Types.ObjectId.isValid(u_id)){
        return res.status(404).json({
          success:false,
          message:"Invalid user id"
        })
       };
    // creating a profile for a user:
     let userProfile = await new Profile({
       firstName:firstName,
       lastName:lastName,
       user_id:u_id,
       avatar:avatar,
       coverImage:coverImage
     }).save();
     
      if(userProfile){
         return res.status(201).json({
          success:true,
          Message:"User profile created Successfully"
          }
        )
      }
                    
         
   }
   catch(error){
    console.log("error occured while creating profile",error);  
     return res.status(500).json({
        success:false,
        message:"Error occured while adding profile"
     })

   }
}
const updateProfile = async(req,res)=>{
   try{
  console.log("Update profile was hit",req.body,req.params);
    const user_id = req.params.u_id;
    const {firstName,lastName,avatar,coverImage} = req.body;
    if(!user_id){
        return res.status(404).json({
            success:false,
            message:"user id is required"
          }        
        )
    }
    if(!mongoose.Types.ObjectId.isValid(user_id)){
         return res.status(403).json({
            success:false,
            message:"Please enter valid user id"
          }      
        ) 
    } 
    const filter = {user_id:user_id};
    const update=  {
       firstName:firstName,
       lastName:lastName,
       avatar:avatar,
       coverImage:coverImage 
    }  
let updatedProfile = await Profile.updateOne(filter,
    update,
    {upsert:true}
) 
     if(updatedProfile){
        return res.status(201).json({
            success:true,
            message:"Profile updated successfully"
        })  
     }

   }catch(error){

    
   }    
}
const fetchProfile = async(req,res)=>{
    try{
    console.log("get profile route was hit");
      const user_id = req.params.u_id;
       if(!user_id){
        return res.status(404).json({
            success:false,
            message:"User id is required"
        })
       }             
        if(!mongoose.Types.ObjectId.isValid(user_id)){
         return res.status(403).json({
            success:false,
            message:"Please enter valid User id"
        })          

        }
      let userProfile = await Profile.findOne({user_id:user_id});
      if(!userProfile){
          return res.status(404).json({
            success:false,
            message:"Profile was not found please add profile"
        })

      }

      return res.status(200).json({
        success:true,
        message:"Profile found successfully",
        Profile:userProfile
      })
 


    }catch(error){
         console.log("Error occured while fetching profile");
         return res.status(500).json({
            success:false,
            message:"Error occured while fetching profile"
         }
         )
    }
}
module.exports = {createProfile,updateProfile,fetchProfile};
