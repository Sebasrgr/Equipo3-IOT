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
        minTemperature,
        maxTemperature,
        minHumidity,
        maxHumidity,
        minConductivity,
        maxConductivity,
        minLux,
        maxLux,
        minCalcium,
        maxCalcium,
        minNitr,
        maxNitr,
        minPotassium,
        maxPotassium,
        minSodium,
        maxSodium
    } = JSON.parse(event.body);

    const paramsTemp = {
        ExpressionAttributeNames: {
            "#min": "min",
            "#max": "max"
        },
        ExpressionAttributeValues: {
            ":x": {
                N: minTemperature
            },
            ":y": {
                N: maxTemperature
            }
        },
        Key: {
            "id": 1
        },
        ReturnValues: "UPDATED_OLD",
        TableName: "MinMax",
        UpdateExpression: "SET #min = :x, #max = :y"
    };

    const paramsHum = {
        ExpressionAttributeNames: {
            "#min": "min",
            "#max": "max"
        },
        ExpressionAttributeValues: {
            ":x": {
                N: minHumidity
            },
            ":y": {
                N: maxHumidity
            }
        },
        Key: {
            "id": 2
        },
        ReturnValues: "UPDATED_OLD",
        TableName: "MinMax",
        UpdateExpression: "SET #min = :x, #max = :y"
    };

    const paramsCond = {
        ExpressionAttributeNames: {
            "#min": "min",
            "#max": "max"
        },
        ExpressionAttributeValues: {
            ":x": {
                N: minConductivity
            },
            ":y": {
                N: maxConductivity
            }
        },
        Key: {
            "id": 3
        },
        ReturnValues: "UPDATED_OLD",
        TableName: "MinMax",
        UpdateExpression: "SET #min = :x, #max = :y"
    };

    const paramsLux = {
        ExpressionAttributeNames: {
            "#min": "min",
            "#max": "max"
        },
        ExpressionAttributeValues: {
            ":x": {
                N: minLux
            },
            ":y": {
                N: maxLux
            }
        },
        Key: {
            "id": 4
        },
        ReturnValues: "UPDATED_OLD",
        TableName: "MinMax",
        UpdateExpression: "SET #min = :x, #max = :y"
    };

    const paramsPot = {
        ExpressionAttributeNames: {
            "#min": "min",
            "#max": "max"
        },
        ExpressionAttributeValues: {
            ":x": {
                N: minPotassium
            },
            ":y": {
                N: maxPotassium
            }
        },
        Key: {
            "id": 5
        },
        ReturnValues: "UPDATED_OLD",
        TableName: "MinMax",
        UpdateExpression: "SET #min = :x, #max = :y"
    };

    const paramsCal = {
        ExpressionAttributeNames: {
            "#min": "min",
            "#max": "max"
        },
        ExpressionAttributeValues: {
            ":x": {
                N: minCalcium
            },
            ":y": {
                N: maxCalcium
            }
        },
        Key: {
            "id": 6
        },
        ReturnValues: "UPDATED_OLD",
        TableName: "MinMax",
        UpdateExpression: "SET #min = :x, #max = :y"
    };

    const paramsSod = {
        ExpressionAttributeNames: {
            "#min": "min",
            "#max": "max"
        },
        ExpressionAttributeValues: {
            ":x": {
                N: minSodium
            },
            ":y": {
                N: maxSodium
            }
        },
        Key: {
            "id": 7
        },
        ReturnValues: "UPDATED_OLD",
        TableName: "MinMax",
        UpdateExpression: "SET #min = :x, #max = :y"
    };

    const paramsNit = {
        ExpressionAttributeNames: {
            "#min": "min",
            "#max": "max"
        },
        ExpressionAttributeValues: {
            ":x": {
                N: minNitr
            },
            ":y": {
                N: maxNitr
            }
        },
        Key: {
            "id": 8
        },
        ReturnValues: "UPDATED_OLD",
        TableName: "MinMax",
        UpdateExpression: "SET #min = :x, #max = :y"
    };

    try {
        const data = await documentClient.updateItem(paramsTemp).promise();
        data = await documentClient.updateItem(paramsHum).promise();
        data = await documentClient.updateItem(paramsCond).promise();
        data = await documentClient.updateItem(paramsLux).promise();
        data = await documentClient.updateItem(paramsPot).promise();
        data = await documentClient.updateItem(paramsCal).promise();
        data = await documentClient.updateItem(paramsSod).promise();
        data = await documentClient.updateItem(paramsNit).promise();
        statusCode = 201;
        responseBody = JSON.stringify(data);
    } catch (err) {
        statusCode = 403;
        responseBody = `No se pudieron actualizar las mediciones: ${err}`;
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