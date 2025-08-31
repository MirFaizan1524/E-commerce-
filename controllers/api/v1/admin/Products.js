const Product = require("../../../../models/product.model.js");
const mongoose = require("mongoose");

const addProduct  = async(req,res)=>{

   try{
      console.log("Add product route was hit");
      const userDetails = req.user;
      const {productName,productDescription,productCatgeory,productQuantity,productPrice,productVariants,productBrand,avatar,coverImages}  = req.body;
       if(userDetails.user.role!="admin"){
          return res.status(401).json({
            success:false,
            message:"Un-authorized access please login as Admin!"
          })
       }
       if(!productName || !productCatgeory || !productPrice || !productQuantity  || !productBrand || !productVariants){
          return res.status(400).json({
            success:"false",
            message:"All fields are compulosry"
          })
       }
       if(!mongoose.Types.ObjectId.isValid(productCatgeory)){
          return res.status(401).json({
            success:"false",
            message:"Please enter valid category id"
          })

       }
    //    console.log("ProductVariants",productVariants,productBrand);
       let totalStock = 0;
       for(variant of productVariants){
          console.log(variant);
           totalStock+=variant.stock;

       }
    //    console.log("Total Stock of product",totalStock);
       if(totalStock!=productQuantity){
         return res.status(400).json({
           success:false,
           message:"Please enter proper stock and quantity"
         })

       }
       // adding product:
       const addProduct = await new Product({
        productName:productName.toLowerCase(),
        productDescription:productDescription.toLowerCase(),
        productCatgeory:productCatgeory,
        productPrice:productPrice,
        productQuantity:productQuantity,
        productVariants:productVariants,
        productBrand:productBrand,
        avatar:avatar,
        coverImages:coverImages,
        addedBy:userDetails.user._id,
       }).save();
       if(!addProduct){
          return res.status(404).json({
            success:false,
            message:"Product was not added"
          })
       }
        return res.status(201).json({
            success:true,
            message:"Product added successfully",
            product:addProduct
          })

   }

   catch(error){
    console.log("Error occured while adding product",error);
    return res.status(500).json({
        success:false,
        message:"Error occured while adding product",
        
    })
   }

}

const updateProduct = async(req,res)=>{
   try{
     
       const userDetails = req.user;
       if(userDetails.user.role!="admin"){
          return res.status(401).json({
            success:false,
            message:"Un-authorized access please login as Admin!"
          })
       }
       const updatedBy = userDetails.user._id;
       const {productName,productDescription,productCatgeory,productQuantity,productPrice,productVariants,productBrand,avatar,coverImages,addedBy}  = req.body;
       // checking for valid category id:
         if(!mongoose.Types.ObjectId.isValid(productCatgeory)){
            return res.status(403).json({
                success:false,
                message:"Please enter valid category Id"
            })
         }
        const product_id = req.query.P_ID;
        // checking for valid product id:
         if(!mongoose.Types.ObjectId.isValid(product_id)){
            return res.status(401).json({
                success:false,
                message:"Please enter valid product id"
            })
         }
       
       // Checking if admin wants to update quantity then it should also reflect in variant's stock key:
       
        if(productQuantity){
            let totalStock = 0;
           for(variant of productVariants){
           totalStock+=variant.stock;
           }
           if(totalStock!=productQuantity){
              return res.status(403).json({
                success:false,
                 message:"Please enter proper stock and quantity while updating"
              })
           }
                                
        }
       let updatedProduct = await Product.findByIdAndUpdate({_id:product_id},
        {
          productName:productName,
          productDescription:productDescription,
          productPrice:productPrice,
          productQuantity:productQuantity,
          productCatgeory:productCatgeory,
          productBrand:productBrand,
          productVariants:productVariants,
          avatar:avatar,
          coverImages:coverImages,
          addedBy:addedBy,
          updatedby:updatedBy    
        }
       );
       if(!updateProduct){
          return res.status(404).json({
            success:false,
            message:"Product was not updated!"
          })
       }
       return res.status(201).json({
        success:true,
        message:"Product updated successfully"
       })
          

   }
   catch(error){
     console.log("Error occured while updating product",error);   
     return res.status(500).json({
        success:true,
        message:"Error occured while updating product"
       })
   }

}

module.exports = {addProduct,updateProduct};