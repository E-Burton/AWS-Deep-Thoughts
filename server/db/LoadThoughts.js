// Dependencies
const AWS = require('aws-sdk');
const fs = require('fs');

// Creating interface with DynamoDB
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

// Creating dynamodb service object using DocumentClient() class
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: "2012-08-10"});

// Using fs package to read users.json file and assing object to allUsers const variable
console.log("Importing thoughts into DynamoDB. Please wait.");
const allUsers = JSON.parse(fs.readFileSync('./server/seed/users.json', 'utf8'));

// Looping over allUsers array and creating params object with the elements in the array
allUsers.forEach(user => {
    const params = {
        TableName: "Thoughts",
        Item: {
            "username": user.username,
            "createdAt": user.createdAt,
            "thought": user.thought
        }
    };

    // Making call to database to insert data (put method)
    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add thought", user.username, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", user.username);
        }
    });
})