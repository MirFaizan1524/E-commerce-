const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true,
    unique:true
  },
  address:{
    type:String
     
  },
  role:{
    type:String,
    enum:["admin","customer","supplier"],
    default:"customer" 
  }
       

},{timestamps:true})

const User = mongoose.model("User", UserSchema);

module.exports = User;