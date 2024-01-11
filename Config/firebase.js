// Importing the firebase-admin module
const admin = require('firebase-admin');

// Importing the service account key for Firebase
const serviceAccount = require('../royalfurnitures-ba1c7-firebase-adminsdk-na100-54794f5b5b.json');

// Initializing the Firebase Admin SDK with the provided credentials and storage bucket information
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://royalfurnitures-ba1c7.appspot.com',
});

// Getting a reference to the Firebase Storage bucket
const bucket = admin.storage().bucket();

// Exporting the bucket reference for use in other modules
module.exports = { bucket };
    