// Importing the firebase-admin module
const admin = require('firebase-admin');

// Importing the service account key for Firebase
const serviceAccount = require('../../serviceAccountKey.json');

// Initializing the Firebase Admin SDK with the provided credentials and storage bucket information
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://contentcreator-ddc7a.appspot.com',
});

// Getting a reference to the Firebase Storage bucket
const bucket = admin.storage().bucket();

// Exporting the bucket reference for use in other modules
module.exports = { bucket };
    