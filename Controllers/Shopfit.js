const { bucket } = require('../Config/firebase');
const Shopfit = require('../Models/Shopfit');
const Blog = require('../Models/DesignIdeasBlog');


// Controller function for creating a new post
exports.CreatePost = async (req, res) => {
  try {
    // Create a new post in the Gallery model using data from the request body
    Shopfit.create(req.body).then(result => {
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
        { $match: { category: "Shopfit" } },
        { $group: {
            _id: "$subType",
            count: { $sum: 1 }
          }
        },
        { $lookup: {
            from: "ShopfitGallery", // Specify the target collection
            localField: "_id", // Field from the previous aggregation result
            foreignField: "Title", // Field from the target collection
            as: "matchedDocuments" // Output array field where the matched documents will be stored
          }
        }
      ]);
      res.status(200).json({
        message: "Get Shopfit data successfully",
        data: result,
        Title:"Discover retail-focused furniture design ideas aimed at enhancing customer experiences and optimizing store layouts. From stylish display units to functional checkout counters, explore solutions that blend aesthetics with functionality, creating inviting and efficient retail spaces for shoppers and businesses alike."
      });
      console.log("blog counts",result[0].matchedDocuments);
    }
    else{ 
    // Fetch all data from the Gallery model
    Shopfit.find().then(result => {
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
    Shopfit.updateOne({_id:id},req.body).then(result => {
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
    Shopfit.deleteOne({_id:id}).then(result => {
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




