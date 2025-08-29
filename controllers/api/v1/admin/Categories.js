const Category = require("../../../../models/category.model.js");





const addCategory = async(req,res)=>{
  try{
        // console.log("Add category was hit");
        const userDetails = req.user;
        const {categoryName,categoryType} = req.body;
        if(userDetails.user.role!="admin"){
          return res.status(401).json({
            success:false,
            message:"Un-Authorised Access, Only Admin is supposed to use this resource"
          })            
        }
        if(!categoryName || !categoryType){
             return res.status(404).json({
            success:false,
            message:"All fields are required"
          })     
        }
      // Add category into Db:
      let categoryAdded = await new Category({
        categoryName:categoryName,
        categoryType:categoryType
      }).save();
       if(categoryAdded){
           return res.status(201).json({
            success:true,
            message:"Category Added successfully",
            CategoryAdded:categoryAdded
           })
       }  
    }
      catch(error){
      console.log("Error occured while adding category",error)
       return res.status(500).json({
        success:false,
        message:"Error occured while adding category"
       })

    }



}  

module.exports = {addCategory};