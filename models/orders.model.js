const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    product_variant:{
      type:mongoose.Schema.ObjectId,
      ref:"Product",
      required:true
    },
    quantity:{
        type:Number,
        required:true
    }

});

const OrderSchema = new mongoose.Schema({
      orderPrice:{
        type:Number
      },
      customer:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
      },
      orderItems:[orderItemSchema],
       orderStatus:{
            type:String,
            enum:["PENDING","CANCELLED","DELIVERED"],
            default:"PENDING",
        } 
},{timestamps:true});
const Order = mongoose.model("Order",OrderSchema);
module.exports = Order;