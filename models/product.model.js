const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName:{
    type:String,
    required:true,
    unique:true
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
    // required:true,
    default:"https://media.istockphoto.com/id/1546442230/photo/front-view-skin-care-products-on-wooden-decorative-piece.jpg?s=2048x2048&w=is&k=20&c=bJzRs0dM28Rm3sT8vBRMa9Mzb1WLUtMXqX6GQZGJ8Is="

  },
  coverImages:[
    {
        type:String,
        default:"https://media.istockphoto.com/id/1546442230/photo/front-view-skin-care-products-on-wooden-decorative-piece.jpg?s=2048x2048&w=is&k=20&c=bJzRs0dM28Rm3sT8vBRMa9Mzb1WLUtMXqX6GQZGJ8Is="
    }
  ],
  productVariants:{
    type: [
    {
      color: { type: String },
      size: { type: String },
      stock: { type: Number, default: 0 } // availability per variant
    }
  ],
  requred:true,

},
productBrand:{ 
    type:{
  name: { type: String, required: true,lowercase:true},     // brand name (e.g. Nike, Adidas)
  country: { type: String },                  // origin country (optional)
  establishedYear: { type: Number },          // year brand started (optional)
  website: { type: String },
  for:{
    type:String,
     enum:["clothes","electronics","groceries","cosmetics","books","toys","medicine"       
     ],
     default:"unknown"                  // brand official site
     }
   },
   required:true

},
addedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
updatedby:{
   type:mongoose.Schema.Types.ObjectId,
    ref:"User"  
}
  
    

},{timestamps:true});
const Product = mongoose.model("Product",ProductSchema);
module.exports = Product;
