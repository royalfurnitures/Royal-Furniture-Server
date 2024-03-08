const { bucket } = require('../Config/firebase');
const MediFurn = require('../Models/Medifurn');
const Blog = require('../Models/DesignIdeasBlog');


// Controller function for creating a new post
exports.CreatePost = async (req, res) => {
  try {
    // Create a new post in the Gallery model using data from the request body
    MediFurn.create(req.body).then(result => {
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
        { $match: { category: "MediFurn" } },
        { $group: {
            _id: "$subType",
            count: { $sum: 1 }
          }
        },
        { $lookup: {
            from: "MediFurnGallery", // Specify the target collection
            localField: "_id", // Field from the previous aggregation result
            foreignField: "Title", // Field from the target collection
            as: "matchedDocuments" // Output array field where the matched documents will be stored
          }
        }
      ]);
      res.status(200).json({
        message: "Get Medi Furn data successfully",
        data: result,
        Title:"Dive into a range of ergonomic and practical medical furniture designs tailored to healthcare settings. From patient rooms to examination areas, explore solutions that prioritize comfort, hygiene, and accessibility, ensuring optimal functionality for both patients and healthcare professionals."
      });
      console.log("blog counts",result[0].matchedDocuments);
    }
    else{
    // Fetch all data from the Gallery model
    MediFurn.find().then(result => {
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
    MediFurn.updateOne({_id:id},req.body).then(result => {
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
    MediFurn.deleteOne({_id:id}).then(result => {
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




