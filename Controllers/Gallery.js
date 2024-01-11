const { bucket } = require('../Config/firebase');
const Gallery = require('../Models/Gallery');
const { v4: uuidv4 } = require('uuid'); 

// Controller function for uploading images
exports.uploadImage = async (req, res) => {
  try {
    // Check if files are present in the request
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    // Create an array of promises for uploading each file
    const uploadPromises = req.files.map((file, index) => {
      return new Promise((resolve, reject) => {
        const fileName = `${uuidv4()}_${file.originalname}`
        const fileUpload = bucket.file(fileName);

        // Create a write stream for the file
        const stream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        // Handle errors during the upload process
        stream.on('error', (err) => {
          reject(`Error uploading file ${index + 1}: ${err}`);
        });

        // Handle successful file upload
        stream.on('finish', () => {
          fileUpload.getMetadata()
            .then((metadata) => {
              // const Url = "https://firebasestorage.googleapis.com/v0/b/contentcreator-ddc7a.appspot.com/o/Photoname?alt=media&token=1dd9c17c-f245-4103-9177-28980c5c0cd5";
              const Url = "https://firebasestorage.googleapis.com/v0/b/royalfurnitures-ba1c7.appspot.com/o/Photoname?alt=media&token=1dd9c17c-f245-4103-917"
              const Filename = metadata[0].name;
              const bucket = metadata[0].bucket;
              const generation = metadata[0].generation;
              const updatedImageUrl = Url.replace(/\/o\/([^?]+)\?/, `/o/${Filename}?`);
              resolve({ Filename, Bucket: bucket, Generation: generation, URL: updatedImageUrl });
            })
            .catch((error) => {
              reject(`Error getting image URL for file ${index + 1}: ${error.message}`);
            });
        });

        // End the stream by writing the file buffer
        stream.end(file.buffer);
      });
    });

    // Execute all upload promises in parallel
    Promise.all(uploadPromises)
      .then((imageUrls) => {
        return res.status(200).json({ message: 'Files uploaded successfully.', imageUrls });
      })
      .catch((error) => {
        return res.status(500).send(`Error uploading files: ${error}`);
      });
  } catch (error) {
    return res.status(500).send(`Error uploading files: ${error.message}`);
  }
};

// Controller function for creating a new post
exports.CreatePost = async (req, res) => {
  try {
    // Create a new post in the Gallery model using data from the request body
    Gallery.create(req.body).then(result => {
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
    // Fetch all data from the Gallery model
    Gallery.find().then(result => {
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
  } catch (error) {
    res.status(500).json({
      message: "Error in Database",
      error: error
    });
  }
};

// Controller function for deleting a photo
exports.DeletePhoto = async (req, res) => {
  try {
    // Extract file details from the request body
    const fileDetails = {
      name: req.body.Filename,
      bucket: req.body.Bucket,
      generation: req.body.Generation
    };

    // console.log("filedetails", fileDetails);

    // Delete the file using the file details
    bucket.file(fileDetails.name).delete({ generation: fileDetails.generation })
      .then(() => {
        // console.log(`File ${fileDetails.name} deleted successfully.`);
        res.status(200).json({ message: `File ${fileDetails.name} deleted successfully.`,data:{ Generation:fileDetails.generation , Filename:fileDetails.name } });
      })
      .catch((error) => {
        // console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Error deleting file', error: error });
      });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting file', error: error });
  }
};



// Controller function for creating a new post
exports.UpdatePost = async (req, res) => {
  let { id } = req.body ;
  try {
    // Update a  post in the Gallery model using data from the request body
    Gallery.updateOne({_id:id},req.body).then(result => {
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
    Gallery.deleteOne({_id:id}).then(result => {
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




