'use strict'
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-1"
});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({
        region: "us-east-1"
    });
    let responseBody = "";
    let statusCode = 0;

    const paramsMinMax = {
        TableName: "MinMax",
        ProjectionExpression: "measurementType, #value_min, #value_max",
        ExpressionAttributeNames: {
            "#value_min": "min",
            "#value_max": "max",
        },
        ExpressionAttributeValues: {
            ":device_id":  "nodemcu"
        }, 
        KeyConditionExpression: "deviceid = :device_id"
    };

    try {
        const minMaxData = await documentClient.query(paramsMinMax).promise();

        statusCode = 200;
        responseBody = JSON.stringify(minMaxData.Items);
    } catch (err) {
        statusCode = 404;
        responseBody = `No se encontraron los límites: ${err}`;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    return response;
}