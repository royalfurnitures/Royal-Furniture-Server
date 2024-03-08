const { bucket } = require('../Config/firebase');
const Modular = require('../Models/Modular');
const Blog = require('../Models/DesignIdeasBlog');


// Controller function for creating a new post
exports.CreatePost = async (req, res) => {
  try {
    // Create a new post in the Gallery model using data from the request body
    Modular.create(req.body).then(result => {
      res.status(201).json({
        message: "Post Published Successfully!!!",
        data: result
      });
    })
      .catch(err => {
        res.status(500).json({
          message: "Error in database",
          error: err
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Error in database",
      error: error
    });
  }
};


// Controller function for fetching all photos
exports.GetAllPhotos = async (req, res) => {
  try {
    if(req.params.query !== "null"){
      let result = await Blog.aggregate([
        { $match: { category: "Modular" } },
        { $group: {
            _id: "$subType",
            count: { $sum: 1 }
          }
        },
        { $lookup: {
            from: "ModularGallery", // Specify the target collection
            localField: "_id", // Field from the previous aggregation result
            foreignField: "Title", // Field from the target collection
            as: "matchedDocuments" // Output array field where the matched documents will be stored
          }
        }
      ]);
      
      res.status(200).json({
        message: "Get Modular data successfully",
        data: result,
        Title:"Delve into innovative modular furniture solutions designed to maximize functionality and adaptability in modern living and work environments. Discover space-saving designs and customizable configurations that cater to diverse spatial needs, offering flexibility and efficiency without compromising on style."
      });
      console.log("blog counts",result);
    }
    else{ 
    // Fetch all data from the Gallery model
    Modular.find().then(result => {
      res.status(200).json({
        message: "Get data successfully",
        data: result
      });
    })
      .catch(err => {
        res.status(500).json({
          message: "Error in Database",
          error: err
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error in Database",
      error: error
    });
  }
};


// Controller function for creating a new post
exports.UpdatePost = async (req, res) => {
  let { id } = req.body ;
  try {
    // Update a  post in the Gallery model using data from the request body
    Modular.updateOne({_id:id},req.body).then(result => {
      res.status(201).json({
        message: "Post Updated Successfully!!!",
        data: result
      });
    })
      .catch(err => {
        res.status(500).json({
          message: "Error in database",
          error: err
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Error in database",
      error: error
    });
  }
};

exports.DeletePost = async (req, res) => {
  let { id } = req.body ;
  try {
    // Update a  post in the Gallery model using data from the request body
    Modular.deleteOne({_id:id}).then(result => {
      res.status(201).json({
        message: "Post Deleted Successfully!!!",
        data: result
      });
    })
      .catch(err => {
        res.status(500).json({
          message: "Error in database",
          error: err
        });
      });
  } catch (error) {
    res.status(500).json({
      message: "Error in database",
      error: error
    });
  }
};




