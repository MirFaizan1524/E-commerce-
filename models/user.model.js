const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    next();
})
UserSchema.methods.isPasswordCorrect = async function (password){
  // console.log("Password Hash is Schema",password);
           return await bcrypt.compare(password, this.password);
}
const User = mongoose.model("User", UserSchema);

module.exports = User;