const mongoose = require('mongoose');
const Cart = require("../../../../models/cart.model.js");
const Product = require("../../../../models/product.model.js");

const addToCart = async(req,res)=>{
   try{
      console.log("Add cart route was hit");
      const userDetails = req.user;
      if(userDetails.user.role!='customer'){
          return res.status(401).json({
            success:false,
            message:"Kindly login as customer"
          })

      } 
      
       const product_id = req.query.P_ID;
       const user_id = userDetails.user._id;               
       const quantity=  req.body.quantity;
       if(!quantity || quantity<=0){
         return res.status(404).json({
            success:false,
            message:"Please enter valid Quantity"
          })

       }
       
      if(!mongoose.Types.ObjectId.isValid(product_id)  && !mongoose.Types.ObjectId.isValid(user_id) ){
         return res.status(404).json({
            success:false,
            message:"Please enter valid product id and user id"
          })

      }
      //checking whether the product exists or not:
      const productDetails = await Product.findOne({_id:product_id});
        if(!productDetails){
          return res.status(404).json({
            success:false,
            message:"Product was not found to add in cart"
          })
        }
      
       // checking the product availabitlty in required quantity:
       if(!productDetails.productQuantity>=quantity){
            return res.status(404).json({
            message:"Product is not available in this quantity"
          })     
       }
  
      // checking if product already exists in cart:
        let existingCartItem = await Cart.findOne({cartProduct:product_id});
        if(existingCartItem){
          return res.status(200).json({
            success:false,
            message:"Product is already in Cart"
          })
        }          

      // Finally adding product in Cart:
      const addcartItem =  await new Cart({
        cartProduct:product_id,
        cartUser:user_id,
        quantity:quantity
      }).save();

      if(!addcartItem){
          return res.status(404).json({
            success:false,
            message:"Cart item was not added!"
          })        
 
      }

       return res.status(201).json({
            success:true,
            message:"Cart item was added successfully",
            cartItem:addcartItem
          }) 

   }
   catch(error){
      console.log("Error occured while adding to cart",error);
      return res.status(500).json({
        success:false,
        message:"Error occured while adding to cart"
      })

   }
}
const deleteProductFromCart = async(req,res)=>{
   try{
      console.log("Delete item from cart was hit"); 
      const cart_id = req.query.C_ID;
       const userDetails = req.user;
       if(userDetails.user.role!='customer'){
            return res.status(401).json({
            success:false,
            message:"Un-authorized error please login as customer"
         })


       }
        const user_id = userDetails.user._id;   

      if(!mongoose.Types.ObjectId.isValid(cart_id)){
         return res.status(401).json({
            success:false,
            message:"Please Enter Valid Cart Id"
         })
         
      }
      // checking and deleting simultaneously existence of a cart item of specific customer;
      let deletedItem =await Cart.findOneAndDelete({
          _id:cart_id,
          cartUser:user_id
      })
       if(!deletedItem){
            return res.status(404).json({
            success:false,
            message:"Cart item was not deleted"
         })

       }
       
        return res.status(201).json({
            success:false,
            message:"Cart item was Deleted successfully",
            deletedItem:deletedItem
         })

   }catch(error){
       console.log("Error occured while deleting the Cart item",error);

       return res.status(500).json({
            success:false,
            message:"Error occured while deleting the Cart item"
         })

   }


}

module.exports = {addToCart,deleteProductFromCart}  




