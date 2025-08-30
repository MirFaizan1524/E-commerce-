const mongoose = require('mongoose');

const ProductVariationSchema = new mongoose.Schema({
   colors:[
    {      
        type:String
    }
   ],
   size:[{
    type:String,
   }]

},{timestamps:true});
const ProductVariation = mongoose.model("ProductVariation",ProductVariationSchema);
module.exports = ProductVariation;