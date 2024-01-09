const Contact = require('../Models/Contact');

// Controller function for registering contact information
exports.RegisterContact = (req, res) => {
    // Extracting data from the request body
    
    let data = {
        Name: req.body.Name,
        Email: req.body.Email,
        MobileNo: req.body.MobileNo,
        Pincode: req.body.Pincode
    };

    // Create a new entry in the Contact model with the provided data
    Contact.create(data).then(result => {
        // Respond with a 201 status code and JSON containing a success message, the registered data, and a flag indicating successful registration
        res.status(201).json({
            message: "Successfully registered, we will contact you soon !!!",
            data: result,
            isRegistered: true
        });
    })
        .catch(err => {
            // Respond with a 500 status code and JSON containing an error message and a flag indicating unsuccessful registration
            res.status(500).json({
                message: "Error in Database !!!",
                error: err,
                isRegistered: false
            });
        });
}
