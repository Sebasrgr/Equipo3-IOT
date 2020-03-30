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
        TableName: "Measurement",
        "ProjectionExpression": "humidity, temperature, lumens, date_timestamp", // SELECT
        Key: {
            "device_id": event.pathParameters.id   // WHERE device_id = path.id
        }
    };

    try {
        const data = await documentClient.get(params).promise();
        statusCode = 200;
        responseBody = JSON.stringify(data);
    } catch (err) {
        statusCode = 404;
        responseBody = `No se encontraron las mediciones de ese dispositivo: ${err}`;
    }

    const response = {
        statusCode : statusCode,
        headers : {
            "Content-Type" : "application/json"
        },
        body : responseBody
    };

    return response;
}