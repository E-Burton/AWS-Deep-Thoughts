// Dependencies
const AWS = require('aws-sdk');

// Modifying AWS config object that DynamoDB will use to connect to local instance
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
});

// Creating dynamodb service interface object using DynamoDB class
const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});

// Object that will hold the schema and metadata of the table
const params = {
    TableName: "Thoughts",
    KeySchema: [
        { AttributeName: "username", KeyType: "HASH"}, // Partition Key
        { AttributeName: "createdAt", KeyType: "RANGE"} // Sort Key (allows queries to automatically sort by this value, which will orders thoughts by most recent entry)
    ],
    AttributeDefinitions: [
        { AttributeName: "username", AttributeType: "S"}, // S as in string
        { AttributeName: "createdAt", AttributeType: "N"} // N as in number
    ],
    // Property to reserve maximum write and read capacity of database
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

// Making call dynamodb instance to create table
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});


