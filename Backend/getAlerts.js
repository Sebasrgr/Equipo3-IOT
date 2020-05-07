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


    const paramsSensor = {
        TableName: "MineralMeasurement",
        ProjectionExpression: "deviceid, payload",
        ScanIndexForward: false,
        Limit: 1,
        ExpressionAttributeValues: {
            ":device_id":  "nodemcu"
        }, 
        KeyConditionExpression: "deviceid = :device_id"
    };

    const paramsMinerals = {
        TableName: "MineralMeasurement",
        ProjectionExpression: "deviceid, payload",
        ScanIndexForward: false,
        Limit: 1,
        ExpressionAttributeValues: {
            ":device_id":  "nodemcu"
        }, 
        KeyConditionExpression: "deviceid = :device_id"
    };

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
        const sensorData = await documentClient.query(paramsSensor).promise();
        const mineralData = await documentClient.query(paramsMinerals).promise();
        const minMaxData = await documentClient.query(paramsMinMax).promise();

        // Calculando datos
        let resultObject = {
            temperature: "No hay alertas",
            humidity: "No hay alertas",
            conductivity: "No hay alertas",
            LUX: "No hay alertas",
            potassium: "No hay alertas",
            sodium: "No hay alertas",
            calcium: "No hay alertas",
            nitrates: "No hay alertas",
        }

        let temp = sensorData.Items[0]["payload"]["temperature"];
        let cond = sensorData.Items[0]["payload"]["conductivity"];
        let hum = sensorData.Items[0]["payload"]["humidity"];
        let lux = sensorData.Items[0]["payload"]["LUX"];
        let pot = mineralData.Items[0]["payload"]["potassium"];
        let sod = mineralData.Items[0]["payload"]["sodium"];
        let cal = mineralData.Items[0]["payload"]["calcium"];
        let nit = mineralData.Items[0]["payload"]["nitrates"];

        if (temp < minMaxData.Items[0]["min"]) {
            resultObject["temperature"] = "La temperatura es menor a la esperada. Proporcione mayor iluminación o calor."
        } else if (temp > minMaxData.Items[0]["max"]) {
            resultObject["temperature"] = "La temperatura es mayor a la esperada. Proporcione menor iluminación o mayor enfriamiento."
        }

        if (hum < minMaxData.Items[1]["min"]) {
            resultObject["humidity"] = "La humedad es menor a la esperada. Proporcione mayor irrigación."
        } else if (hum > minMaxData.Items[1]["max"]) {
            resultObject["humidity"] = "La humedad es mayor a la esperada. Proporcione menor irrigación."
        }

        if (cond < minMaxData.Items[2]["min"]) {
            resultObject["conductivity"] = "La conductividad es menor a la esperada."
        } else if (cond > minMaxData.Items[2]["max"]) {
            resultObject["conductivity"] = "La conductividad es mayor a la esperada."
        }

        if (lux < minMaxData.Items[3]["min"]) {
            resultObject["LUX"] = "La iluminación es menor a la esperada. Proporcione mayor iluminación."
        } else if (lux > minMaxData.Items[3]["max"]) {
            resultObject["LUX"] = "La iluminación es mayor a la esperada. Proporcione menor iluminación."
        }

        if (pot < minMaxData.Items[4]["min"]) {
            resultObject["potassium"] = `La concentración de potasio en la tierra es menor a la esperada. Proporcione mayor cantidad para alcanzar el mínimo de ${minMaxData.Items[4]["min"]} ppm.`
        } else if (pot > minMaxData.Items[4]["max"]) {
            resultObject["potassium"] = `La concentración de potasio en la tierra es mayor a la esperada. Proporcione menor cantidad para alcanzar un máximo de ${minMaxData.Items[4]["max"]} ppm.`
        }

        if (cal < minMaxData.Items[5]["min"]) {
            resultObject["calcium"] = `La concentración de potasio en la tierra es menor a la esperada. Proporcione mayor cantidad para alcanzar el mínimo de ${minMaxData.Items[5]["min"]} ppm.`
        } else if (cal > minMaxData.Items[5]["max"]) {
            resultObject["calcium"] = `La concentración de potasio en la tierra es mayor a la esperada. Proporcione menor cantidad para alcanzar un máximo de ${minMaxData.Items[5]["max"]} ppm.`
        }

        if (sod < minMaxData.Items[6]["min"]) {
            resultObject["sodium"] = `La concentración de potasio en la tierra es menor a la esperada. Proporcione mayor cantidad para alcanzar el mínimo de ${minMaxData.Items[6]["min"]} ppm.`
        } else if (sod > minMaxData.Items[6]["max"]) {
            resultObject["sodium"] = `La concentración de potasio en la tierra es mayor a la esperada. Proporcione menor cantidad para alcanzar un máximo de ${minMaxData.Items[6]["max"]} ppm.`
        }

        if (nit < minMaxData.Items[7]["min"]) {
            resultObject["nitrates"] = `La concentración de potasio en la tierra es menor a la esperada. Proporcione mayor cantidad para alcanzar el mínimo de ${minMaxData.Items[7]["min"]} ppm.`
        } else if (nit > minMaxData.Items[7]["max"]) {
            resultObject["nitrates"] = `La concentración de potasio en la tierra es mayor a la esperada. Proporcione menor cantidad para alcanzar un máximo de ${minMaxData.Items[7]["max"]} ppm.`
        }

        statusCode = 200;
        responseBody = JSON.stringify(resultObject);
    } catch (err) {
        statusCode = 404;
        responseBody = `No se encontraron las mediciones de ese dispositivo: ${err}`;
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