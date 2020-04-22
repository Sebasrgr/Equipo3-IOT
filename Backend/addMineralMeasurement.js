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

    const {
        device,
        payload
    } = JSON.parse(event.body);
    const params = {
        TableName: "MineralMeasurement",
        Item: {
            deviceid: device,
            timestamp: String(new Date().getTime()),
            payload: payload
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        statusCode = 201;
        responseBody = JSON.stringify(data);
    } catch (err) {
        statusCode = 403;
        responseBody = `No se pudo agregar la medición: ${err}`;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    return response;
}