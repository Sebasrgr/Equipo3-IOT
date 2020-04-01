'use strict'
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

AWS.config.update({
    region: "us-east-1"
});

exports.handler = async (event, context) => {

    let responseBody = "";
    let statusCode = 0;

    const {
        token
    } = JSON.parse(event.body);

    jwt.verify(token, "SENSEIOT_ACCESS", (err, decoded) => {
        if (err) {
            if (err.name == `TokenExpiredError`) {
                statusCode = 401;
                responseBody = {
                    validation: false
                };
            }
            statusCode = 500;
            responseBody = {
                validation: false
            };
        } else {
            statusCode = 200;
            responseBody = {
                validation: true
            };
        }
    });

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(responseBody)
    };

    return response;
}