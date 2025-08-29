const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
   categoryName:{
    type:String,
    required:true,
    unique:true
   },
   categoryType:{
    type:String,
    required:true
   },
   addedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
   }



},{timestamps:true})

const Category = mongoose.model("Category",CategorySchema);
module.exports = Category;