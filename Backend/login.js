'use strict'
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

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
        username,
        password
    } = JSON.parse(event.body);

    const params = {
        TableName: "Auth",
        "ProjectionExpression": "username, password", // SELECT username, password
        Key: {
            "username": username, // WHERE username = body.username
        }
    };

    try {
        const data = await documentClient.get(params).promise();

        if (data.Item.password == password) {
            statusCode = 201;
            let token = jwt.sign({
                    id: data.Item.id,
                    username: data.Item.username
                },
                "SENSEIOT_ACCESS", {
                    expiresIn: 3600
                });
            responseBody = JSON.stringify({
                access_token: token
            });
        } else {
            statusCode = 401;
            responseBody = JSON.stringify({
                "error": `Login inválido.`
            });
        }

    } catch (err) {
        statusCode = 500;
        responseBody = JSON.stringify({
            "error": `El usuario no existe`
        });
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