const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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


UserSchema.pre("save",async function(next){
   if(!this.isModified('password')){
      return next();
  
   }
    this.password = await bcrypt.hash(this.password,10); 
    next()
})
const User = mongoose.model("User", UserSchema);

module.exports = User;