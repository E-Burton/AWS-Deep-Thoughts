// Load the AWS SDK for Node.js
const AWS = require('aws-sdk'); // Package responsible for API that allows app to communicate with web service
const { v4: uuidv4 } = require('uuid'); // Needed to create unique S3 bucket

// Set the region
AWS.config.update({region: 'us-east-2'}); // Updating region in order to communicate with web service

// Create S3 service object with designated API
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling createBucket method that assigns the metadata of the bucket (e.g. the bucket name)
const bucketParams = {
    Bucket : "user-images-" + uuidv4()
};

// Call S3 to create the bucket using bucketParams
s3.createBucket(bucketParams, (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success");
    }
});
