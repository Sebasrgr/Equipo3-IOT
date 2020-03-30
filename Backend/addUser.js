'use strict'
const AWS = require('aws-sdk');

AWS.config.update({
    region: "us-east-1"
});

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
    let responseBody = "";
    let statusCode = 0;

    const {id, username, password} = JSON.parse(event.body);

    const params = {
        TableName: "Auth",
        Item: {
            id: id,
            username : username,
            password : password
        }
    };

    try {
        const data = await documentClient.put(params).promise();
        statusCode = 201;
        responseBody = JSON.stringify(data);
    } catch (err) {
        statusCode = 403;
        responseBody = `No se pudo agregar al usuario: ${err}`;
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