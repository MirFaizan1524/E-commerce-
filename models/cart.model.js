const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
   cartProduct :{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required:true,
   },
   cartUser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   quantity:{
    type:Number,
    required:true
   }           

},{timestamps:true});
const Cart = mongoose.model('Cart',CartSchema);
module.exports = Cart;