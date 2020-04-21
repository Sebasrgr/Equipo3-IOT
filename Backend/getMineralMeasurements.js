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

    const params = {
        TableName: "MineralMeasurement",
        "ProjectionExpression": "deviceid, payload",
    };

    try {
        const data = await documentClient.scan(params).promise();
        statusCode = 200;
        responseBody = data.Items;
    } catch (err) {
        statusCode = 404;
        responseBody = `No se encontró la información: ${err}`;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(responseBody)
    };

    return response;
}