const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  avatar:{
    type:String,
    default:"www.user/ecom.com"
  },
  coverImage:{
      type:String
  }     


},{timestamps:true});

const Profile = mongoose.model("Profile",ProfileSchema);
module.exports = Profile;