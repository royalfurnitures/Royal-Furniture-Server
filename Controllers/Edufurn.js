const { bucket } = require('../Config/firebase');
const EduFurn = require('../Models/Edufurn');
const Blog = require('../Models/DesignIdeasBlog');


// Controller function for creating a new post
exports.CreatePost = async (req, res) => {
  try {
    // Create a new post in the Gallery model using data from the request body
    EduFurn.create(req.body).then(result => {
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
        { $match: { category: "EduFurn" } },
        { $group: {
            _id: "$subType",
            count: { $sum: 1 }
          }
        },
        { $lookup: {
            from: "EduFurnGallery", // Specify the target collection
            localField: "_id", // Field from the previous aggregation result
            foreignField: "Title", // Field from the target collection
            as: "matchedDocuments" // Output array field where the matched documents will be stored
          }
        }
      ]);
      res.status(200).json({
        message: "Get Edu furn data successfully",
        data: result,
        Title:"Explore educational furniture design concepts crafted to create dynamic and engaging learning environments. Discover adaptable classroom layouts, collaborative workstations, and student-focused seating arrangements designed to enhance interaction, creativity, and academic performance."
      });
      console.log("blog counts",result[0].matchedDocuments);
    }
    else{
    // Fetch all data from the Gallery model
    EduFurn.find().then(result => {
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
    EduFurn.updateOne({_id:id},req.body).then(result => {
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
    EduFurn.deleteOne({_id:id}).then(result => {
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




