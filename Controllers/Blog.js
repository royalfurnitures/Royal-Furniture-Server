const Blog = require('../Models/DesignIdeasBlog');

exports.CreateBlog = (req,res)=>{
    let {  SubSectionData,
           mainContent1,
           mainContent2 ,
           category,
           subType} = req.body ;
    if(!SubSectionData || !mainContent1|| !mainContent2 ||!category||!subType){
        return res.status(201).json({ message:"Please fill the required Feilds",isSuccess:false })
    }
    Blog.create(req.body).then(result=>{
        res.status(201).json({ message:"Blog Create Successfully",data:result,isSuccess:true })
    })
    .catch(err=>{
          res.status(505).json({ message:"Error in create blog in database",error:err,isSuccess:false })
    })
}

exports.UpdateBlog = (req,res)=>{
    let query = {  _id:req.body.id }
    let {  SubSectionData,
        mainContent1,
        mainContent2 ,
        category,
        subType} = req.body ;
 if(!SubSectionData || !mainContent1|| !mainContent2 ||!category||!subType){
     return res.status(201).json({ message:"Please fill the required Feilds",isSuccess:false })
 }
    Blog.updateOne(query ,req.body).then(result=>{
        res.status(201).json({ message:"Blog Update Successfully",data:result,isSuccess:true })
    })
    .catch(err=>{
          res.status(505).json({ message:"Error in Update blog in database",error:err,isSuccess:false })
    })
}

exports.DeleteBlog = (req,res)=>{
    let query = {  _id:req.body.id }
    Blog.deleteOne(query ,req.body).then(result=>{
        res.status(201).json({ message:"Blog Deleted Successfully",data:result,isSuccess:true })
    })
    .catch(err=>{
          res.status(505).json({ message:"Error in Delete blog in database",error:err,isSuccess:false })
    })
}

exports.GetBlogsbyModules = (req,res)=>{
    let { moduleName } = req.params;
    Blog.find({category:moduleName}).then(result=>{
         res.status(200).json({ message:"Get data Successfully",data:result,isSuccess:true })
    })
    .catch(err=>{
         res.status(505).json({ message : "Error in Get data from database",isSuccess:false,error:err })
    })
}

exports.GetBlogsbyModulesandCategory = (req,res)=>{
    let { moduleName , subType } = req.params;
    console.log(" moduleName , subType", moduleName , subType); 
    Blog.find({category:moduleName,subType}).then(result=>{
         res.status(200).json({ message:"Get data Successfully",data:result,isSuccess:true })
    })
    .catch(err=>{
         res.status(505).json({ message : "Error in Get data from database",isSuccess:false,error:err })
    })
}


exports.GetBlogsbyid = (req,res)=>{
    let { id } = req.params;
    Blog.find({_id:id}).then(result=>{
         res.status(200).json({ message:"Get data Successfully",data:result,isSuccess:true })
    })
    .catch(err=>{
         res.status(505).json({ message : "Error in Get data from database",isSuccess:false,error:err })
    })
}