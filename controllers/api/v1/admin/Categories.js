const Category = require("../../../../models/category.model.js");
const mongoose = require("mongoose");




const addCategory = async(req,res)=>{
  try{
        // console.log("Add category was hit");
        const userDetails = req.user;
        console.log("User Details",userDetails);
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
        categoryType:categoryType,
        addedBy:userDetails.user._id
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

const updateCategory   = async(req,res)=>{
  try{
   
        const userDetails = req.user;
         if(userDetails.user.role!="admin"){
            return res.status(401).json({
                success:false,
                message:"Un-authorised access please login as admin"
            })
         }
      const category_id = req.query.ID;
      let {categoryName,categoryType} = req.body;
      if(!category_id || !mongoose.Types.ObjectId.isValid(category_id)){
          return res.status(402).json({
            success:false,
            message:"Please send valid category id"
        })
      }   
     
      if(!categoryName || !categoryType){
        return res.status(404).json({
            success:false,
            message:"All fields are required"
        })
      }
      // Check whether category exists or not:
     let existingCategory = await Category.findOne({_id:category_id});
     if(!existingCategory){
         
         return res.status(404).json({
            success:false,
            message:"Category not found"
        })

     }
     const updatedCategory = await Category.updateOne({_id:category_id},
        {
          categoryName:categoryName,
          categoryType:categoryType, 
          updatedBy: userDetails.user._id
        }
     );
     
     if(updatedCategory){
        return res.status(201).json({
            success:true,
            message:"Category Updated Successfully",
           
        })
     }
  } 
  catch(error){
    console.log("Error occured in update category",error);
    return res.status(500).json({
        success:false,
        message:"error occured while updating category"
    })
  }


}

const fetchCategory = async(req,res)=>{
  try{
     console.log("get category was hit");
       const userDetails = req.user;
         if(userDetails.user.role!="admin"){
            return res.status(401).json({
                success:false,
                message:"Un-authorised access please login as admin"
            })
         }
         
     const category_id = req.query.ID;
     if(!category_id || !mongoose.Types.ObjectId.isValid(category_id)){
         return res.status(403).json({
            success:false,
            message:"Please enter valid category Id"
         })

     }
     const result = await Category.findOne({_id:category_id}).select({categoryName:1,categoryType:1});
    if(!result){
          return res.status(404).json({
            success:false,
            message:"Catgeory was not found!"
         })
    }
   
     return res.status(200).json({
            success:true,
            message:"Catgeory found successfully",
            Data:result
         })

      

  }catch(error){
    console.log("Error occured while fetching single category",error);
       return res.status(500).json({
            success:false,
            message:"Error occured while fetching single category"
         })
  }


}

const fetchAllcategories  = async(req,res)=>{
    try{
         console.log("Fetch all categories route was hit");
         const userDetails = req.user;
         if(userDetails.user.role!="admin"){
            return res.status(401).json({
                success:false,
                message:"Un-authorised access please login as admin"
            })
         }
         const allCategories = await Category.find().select({categoryName:1,categoryType:1}).sort({createdAt:-1});
         if(!allCategories){
           return res.status(404).json({
                success:false,
                message:"Catgeories not found!"
            })
         }  
         return res.status(200).json({
            success:true,
            message:"Categories found successfully!",
            Categories:allCategories
         })
    }
    catch(error){

        console.log("Error occured while fetching all categories",error); 
        return res.status(500).json({
                success:false,
                message:"Error occured while fetching all categories"
            })
    }
}


module.exports = {addCategory,updateCategory,fetchCategory,fetchAllcategories};