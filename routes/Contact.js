// Importing the express module
const express = require('express');

// Creating a router instance from the express module
const router = express.Router();

// Importing the RegisterContact function from the Contact controller
const { RegisterContact, GetAllContacts, DeleteContact } = require('../Controllers/Contact');

// Defining a POST route '/register-contact' that uses the RegisterContact function
router.post('/register-contact', RegisterContact);
router.get('/get-all-contacts', GetAllContacts);
router.get('/delete-contact/:id', DeleteContact);

// Exporting the router for use in other modules
module.exports = router;
