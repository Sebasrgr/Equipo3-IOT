'use strict'
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-1"
});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
    let responseBody = "";
    let statusCode = 0;

    
    const params = {
        TableName: "MineralMeasurement",
        ProjectionExpression: "deviceid, payload", // SELECT
        KeyConditionExpression: "deviceid = :a",
        ExpressionAttributeValues: {
            ":a": event.pathParameters.id
        }
    };

    try {
        const data = await documentClient.query(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify(data.Items);
    } catch (err) {
        statusCode = 404;
        responseBody = `No se encontraron las mediciones de ese dispositivo: ${err}`;
    }

    const response = {
        statusCode : statusCode,
        headers : {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type" : "application/json"
        },
        body : responseBody
    };

    return response;
}