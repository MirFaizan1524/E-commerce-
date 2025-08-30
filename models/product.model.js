const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName:{
    type:String,
    required:true
  },
  productDescription:{
    type:String
  },
  productCatgeory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true
  },
  productQuantity:{
    type:Number,
    required:true,
    min:0
  },
  productPrice:{
    type:String,
    required:true
  },
  avatar:{
    type:String,
    required:true,
    default:"https://media.istockphoto.com/id/1546442230/photo/front-view-skin-care-products-on-wooden-decorative-piece.jpg?s=2048x2048&w=is&k=20&c=bJzRs0dM28Rm3sT8vBRMa9Mzb1WLUtMXqX6GQZGJ8Is="

  },
  coverImages:[
    {
        type:String,

    }
  ],
  Productvariants: [
    {
      color: { type: String },
      size: { type: String },
      stock: { type: Number, default: 0 } // availability per variant
    }
  ],
  
    

},{timestamps:true});
const Product = mongoose.model("Product",ProductSchema);
module.exports = Product;
