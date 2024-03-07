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
try{
    const phoneRegex = /^\d{10}$/;

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pincodeRegex = /^\d{6}$/;



 let isPhoneDataTrue = phoneRegex.test(req.body.MobileNo);
let isNameDataTrue = nameRegex.test(req.body.Name);
let isEmailDataTrue = emailRegex.test(req.body.Email);
let isPincodeDataTrue = pincodeRegex.test(req.body.Pincode);

if (!isPhoneDataTrue || !isNameDataTrue || !isEmailDataTrue || !isPincodeDataTrue) {
    return res.status(401).json({
        message: "Please fill the details correctly",
        isRegistered: false
    });
}


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
    catch (err){
        res.status(500).json({
            message: "Error in Database !!!",
            error: err,
            isRegistered: false
        });
    }
}

exports.GetAllContacts = (req,res)=>{
       Contact.find().then(result=>{
        res.status(200).json({message:"contact data get successfully",data:result})
       })
       .catch(err=>{
        res.status(500).json({message:"Errror in database",error:err})
       })
} 


exports.DeleteContact = (req,res)=>{
    let {id} = req.params
    // console.log("id",id);
        Contact.deleteOne({ _id: id }).then(result=>{
        // console.log("result",result);
     res.status(200).json({message:"contact deleted successfully",data:result})
    })
    .catch(err=>{
     res.status(500).json({message:"Errror in database",error:err})
    })
} 
