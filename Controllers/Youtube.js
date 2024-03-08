const Youtube = require('../Models/Youtube');

// Extract youtube Video ID from the Youtube watch URL
exports.YoutubeIDExcrator = (req,res)=>{ 
    // console.log("req.body",req.body);

// Function to extract the video ID from the YouTube URL
    function extractVideoId(youtubeUrl) {  
        const match = youtubeUrl.match(/[?&]v=([^&]+)/); 
        return match && match[1];
    }

// Function to convert YouTube URL to embed URL
    function IDExtractor(youtubeUrl) {
        const videoId = extractVideoId(youtubeUrl);
        if (videoId) {
            return { videoId , isIDValid:true };
        } else {
            return { isIDValid:true };
        }
    }

    const YoutubeVideoID = IDExtractor(req.body.url);
    if(YoutubeVideoID.isIDValid){
         res.status(201).json({ message:"Vaild Youtube Video URL !!!",data:{ YoutubeVideoID:YoutubeVideoID.videoId , isValidID : true } })
    }
    else{
         res.status(500).json({ message:"Invalid Youtube URL !!!" ,isValidID : false})
    }
      
}

exports.createYoutubeVideo = (req, res) => { 
    let data = {
        YoutubeVideoID: req.body.VideoID,
        YoutubeVideoTitle: req.body.title,
        Category:req.body.Category
    };
  
    // console.log("Data:", data);
  
    // Check if the video with the given ID already exists
    Youtube.findOne({ YoutubeVideoID: data.YoutubeVideoID })
    .then(existingVideo => {
      if (existingVideo) {
        // Video with the same ID already exists
        return res.status(400).json({
          message: "Video with the same ID already exists",
          isCreate: false
        });
      }
  
      // Video with the given ID doesn't exist, create a new one
      return Youtube.create(data);
    })
    .then(result => {
      // Exit the promise chain if a response has already been sent
      if (!res.headersSent) {
        res.status(201).json({
          message: "Video created successfully",
          data: result,
          isCreate: true
        });
      }
    }) 
    .catch(err => {
      res.status(500).json({
        message: "Error creating video",
        error: err,
        isCreate: false
      });
    });
  
  };

exports.updateYoutubeVideo = (req, res) => { 
    let data = {
        YoutubeVideoID: req.body.VideoID,
        YoutubeVideoTitle: req.body.title,
        Category:req.body.Category
    };
  
    // Check if the video with the given ID already exists
    Youtube.updateOne({ _id: req.body.id }, data)
    .then(existingVideo => {
      if (existingVideo) {
        return res.status(201).json({
          message: "update successfully",
          isSuccess: true
        });
      }
    })
     
    .catch(err => {
      res.status(500).json({
        message: "Error updating video",
        error: err,
        isSuccess: false
      });
    });
  
  };

  exports.deleteYoutubeVideo = (req, res) => { 
    let { id } = req.body ;
    // console.log("Data:", data);
  
    // Check if the video with the given ID already exists
    Youtube.deleteOne({ _id: id })
    .then(existingVideo => {
      if (existingVideo) {
        // Video with the same ID already exists
        return res.status(201).json({
          message: "Video Delete Successfully",
          isSuccess: true
        });
      }
  
     
    })   
    .catch(err => {
      res.status(500).json({
        message: "Error delete video",
        error: err,
        isSuccess: false
      });
    });
  
  };

// Controller function for fetching all YouTube videos
exports.GetVideoData = (req, res) => {
    // Fetch all data from the Youtube model
    let filter = {}
      //  console.log("req.params.query !== null",req.params.query !== null)
        if(req.params.query !== "null"){
             filter.Category = req.params.query ;
         }
  console.log("filter",filter)
    Youtube.find(filter).then(result => {
        // Respond with a 200 status code and JSON containing the retrieved video data
        res.status(200).json({
            message: "Get all Videos !!!",
            data: result
        });
    })
        .catch(err => {
            // Respond with a 500 status code and JSON containing an error message in case of an error
            res.status(500).json({
                message: "Internal server error !!!",
                error: err
            });
        });
}

  