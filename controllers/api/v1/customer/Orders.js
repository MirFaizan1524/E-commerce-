const Order = require("../../../../models/orders.model"); 
const Product = require("../../../../models/product.model.js");
const mongoose  = require("mongoose");

const createOrder = async(req,res)=>{
     const session = await mongoose.startSession();
 try{
     session.startTransaction();
     console.log("Order route was hit");
     const userDetails = req.user;
     if(userDetails.user.role!="customer"){
      return res.status(401).json({
        success:false,
        message:"Un-authorized access kindly login as customer"
      })
     }
     const {orderItems,orderStatus} = req.body;
      // console.log(orderItems,orderStatus);
     // checking for valid product_id and variant_id;
        let totalPrice = 0;
        const validatedItems = [];
     for(let products of orderItems ){
          // checking for valid product_id's and variant id's:
       if(!mongoose.Types.ObjectId.isValid(products['product_id']) && !mongoose.Types.ObjectId.isValid(products['product_variant'] )){
            return res.status(404).json({
              success:false,
              message:"Please enter valid product and product variant id's"
            })
       }
       // checking the product details corresponding to the product id:
        let productDetails = await Product.findById(products['product_id']);
        if(!productDetails){
             return res.status(404).json({
              success:false,
              message:"Product does not exists or not found"
             })
        }
        // confrim the product variant from product details:
        const variant = productDetails?.productVariants;
        // console.log("Product Variant",variant);   
        const productVariant = variant.filter((key)=>{
   
            return (
              key._id == products['product_variant']
            )              

        })
        // product order quantity:
          let quantity = products['quantity'];
        // product price:
         let product_price = Number(productDetails?.productPrice); 
              
        // checking stock:
        let stock  = productVariant[0].stock;
        if(stock<quantity){
            return res.status(404).json({
              success:false,
              message:"Product variant is currenlty out of stock",
              productVariant:productVariant[0]
            }) 
        }
        if(stock < products.productQuantity){
             return res.status(404).json({
              success:false,
              message:"Product is currenlty out of stock",
              product:productDetails
            })
        }

        // now updating the latest stock in variants as well as in general quantity of product:
          const updateProductQuantity = await Product.updateOne(
                                         {_id:products['product_id'],"productVariants._id":products['product_variant']},
                                         {$inc:{productQuantity:-quantity,"productVariants.$.stock":-quantity}},
                                         {session}                                        
           )                             
           console.log(updateProductQuantity); 
        // productVariant[0].stock-= quantity;
        totalPrice += quantity*product_price; 
        
         validatedItems.push({
          product_id:products['product_id'],
          product_variant:productVariant[0]._id,
          quantity:quantity,
          
         }) 
        // console.log(productVariant,"product_quantity",quantity,"Product_price",product_price,"product_stock",stock);  
          
            
     }
     // now creating an order
      let order = await new Order({
        orderPrice:totalPrice,
        customer:userDetails.user._id,
        orderItems:validatedItems,
        // orderStatus:orderStatus
      }).save();
      if(!order){
         session.abortTransaction();
         return res.status(404).json({
          success:false,
          message:"Order was not created"
         }) 
      }
       await session.commitTransaction();
       session.endSession();
      return res.status(201).json({
          success:true,
          message:"Order was created successfully!",
          orderDetails:order
      })
      

      
      
           

  }catch(error){
     session.endSession();
     console.log("Error occured while creating an order",error);
      return res.status(500).json({
        sucess:false,
        message:"Error occured while creating an order"
      })

  }   
    
}

module.exports = {createOrder};
