function login() {
    let usuario = document.querySelector("#usrLog").value;
    let contraseña = document.querySelector("#passLog").value;
    $.ajax({
        method: 'POST',
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/login",
        data: JSON.stringify({
            username: usuario,
            password: contraseña
        }),
        success: function (token) {
            // Do something
            sessionStorage.setItem("token", token['access_token']);
            window.location = '../dashboard.html';
        },
        error: function (error) {
            alert("Las credenciales no son válidas.");
        }
    });
}

function verify(token) {
    token = sessionStorage.getItem("token");
    $.ajax({
        method: 'POST',
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/login/verify",
        data: JSON.stringify({
            token: token
        }),
        success: function (token) {
            // Token still OK
        },
        error: function (error) {
            alert("La sesión ha expirado.");
            logout();
        }
    });
}

function logout() {
    sessionStorage.removeItem("token");
    window.location = '../index.html';
}

function loadAverages() {
    $.ajax({
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/measurement",
        success: function (result) {
            // Do something
            let averageTemp, averageHum, averageCond, averageIllum;
            let countTemp = 0,
                countHum = 0,
                countCond = 0,
                countIllum = 0;
            for (let index = 0; index < result.length; ++index) {
                countTemp += result[index]['payload']['temperature'];
                countHum += result[index]['payload']['humidity'];
                countCond += result[index]['payload']['conductivity'];
                countIllum += result[index]['payload']['LUX'];
            }

            averageTemp = countTemp / result.length;
            averageHum = countHum / result.length;
            averageCond = countCond / result.length;
            averageIllum = countIllum / result.length;

            // Display elements
            document.getElementById('avgTemp').innerHTML = averageTemp.toFixed(2) + " °C";
            document.getElementById('avgHum').innerHTML = averageHum.toFixed(2) + "%";
            document.getElementById('avgCond').innerHTML = averageCond.toFixed(2) + " mS/cm";
            document.getElementById('avgLUX').innerHTML = averageIllum.toFixed(2) + " LUX";
            document.getElementById('measurementsCount').innerHTML = result.length;
        },
        error: function (error) {
            console.log("ERROR:" + JSON.stringify(error));
        }
    });
}

function manualMineral() {
    console.log("Entrando :)");
    let manualPotassium = document.querySelector('#manualPot').value;
    let manualCalcium = document.querySelector('#manualCal').value;
    let manualNitr = document.querySelector('#manualNit').value;
    let manualSodium = document.querySelector('#manualSod').value;
    let manualDates = document.querySelector('#date').value;
    let manualInfo = {
        deviceid: "nodemcu",
        payload: {
            calcium: manualCalcium,
            nitrates: manualNitr,
            potassium: manualPotassium,
            sodium: manualSodium
        },
        date: manualDates
    }

    $.ajax({
        method: 'POST',
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/minerals",
        data: JSON.stringify(manualInfo),
        success: function (token) {
            // Do something
            alert("Guardado");
        },
        error: function (error) {
            alert("Error en guardado, intente nuevamente" + JSON.stringify(error));
        }

    })
}

function register() {
    let usuarioR = document.querySelector("#regUser").value;
    let contraseñaR = document.querySelector("#regPass").value;
    let emailR = document.querySelector("#regEmail").value;
    let phoneR = document.querySelector("#regPhone").value;
    let nameR = document.querySelector("#regName").value;

    $.ajax({
        method: 'POST',
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/register",
        data: JSON.stringify({
            username: usuarioR,
            password: contraseñaR,
            email: emailR,
            phone: phoneR,
            name: nameR
        }),
        success: function (token) {
            // Do something
            alert("Usuario registrado correctamente, favor de iniciar sesión")
            document.cookie = `token=${token};`;
            window.location('../index.html');
        },
        error: function (error) {
            console.log("ERROR:" + JSON.stringify(error));
        }
    });
}

function manualMinMax() {
    let minTemperature = document.querySelector('#minTemp').value;
    let maxTemperature = document.querySelector('#maxTemp').value;
    let minHumidity = document.querySelector('#minHum').value;
    let maxHumidity = document.querySelector('#maxHum').value;
    let minConductivity = document.querySelector('#minCon').value;
    let maxConductivity = document.querySelector('#maxCon').value;
    let minLux = document.querySelector('#minLux').value;
    let maxLux = document.querySelector('#maxLux').value;
    let minPotassium = document.querySelector('#minPot').value;
    let maxPotassium = document.querySelector('#maxPot').value;
    let minSodium = document.querySelector('#minSod').value;
    let maxSodium = document.querySelector('#maxSod').value;
    let minCalcium = document.querySelector('#minCal').value;
    let maxCalcium = document.querySelector('#maxCal').value;
    let minNitr = document.querySelector('#minNit').value;
    let maxNitr = document.querySelector('#maxNit').value;
    let dataMinMax = {
        deviceid: "nodemcu",
        payload: {
            tmpmin: minTemperature,
            tmpmax: maxTemperature,
            hummin: minHumidity,
            hummax: maxHumidity,
            conmin: minConductivity,
            conmax: maxConductivity,
            luxmin: minLux,
            luxmax: maxLux,
            calmin: minCalcium,
            calmax: maxCalcium,
            nitmin: minNitr,
            nitmax: maxNitr,
            potmin: minPotassium,
            potmax: maxPotassium,
            sodmin: minSodium,
            sodmax: maxSodium
        }
    }

    $.ajax({
        method: 'PUT',
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/min-max",
        data: JSON.stringify(dataMinMax),
        success: function (result) {
            // Do something
            alert("Guardado");
        },
        error: function (error) {
            alert("Error en guardado, intente nuevamente" + JSON.stringify(error));
        }

    })
}

function loadMinMax() {
    $.ajax({
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/min-max",
        success: function (result) {
            // Display elements
            document.querySelector('#minTemp').value = result[0].min;
            document.querySelector('#maxTemp').value = result[0].max;
            document.querySelector('#minHum').value = result[1].min;
            document.querySelector('#maxHum').value = result[1].max;
            document.querySelector('#minCon').value = result[2].min;
            document.querySelector('#maxCon').value = result[2].max;
            document.querySelector('#minLux').value = result[3].min;
            document.querySelector('#maxLux').value = result[3].max;
            document.querySelector('#minPot').value = result[4].min;
            document.querySelector('#maxPot').value = result[4].max;
            document.querySelector('#minSod').value = result[5].min;
            document.querySelector('#maxSod').value = result[5].max;
            document.querySelector('#minCal').value = result[6].min;
            document.querySelector('#maxCal').value = result[6].max;
            document.querySelector('#minNit').value = result[7].min;
            document.querySelector('#maxNit').value = result[7].max;
        },
        error: function (error) {
            console.log("ERROR:" + JSON.stringify(error));
        }
    });


}

function loadAlerts() {
    $.ajax({
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/alert",
        success: function (result) {
            // Display elements
            document.querySelector("#tmpAlert").innerHTML = result.temperature;
            document.querySelector("#humAlert").innerHTML = result.humidity;
            document.querySelector("#conAlert").innerHTML = result.conductivity;
            document.querySelector("#luxAlert").innerHTML = result.LUX;
            document.querySelector("#potAlert").innerHTML = result.potassium;
            document.querySelector("#sodAlert").innerHTML = result.sodium;
            document.querySelector("#calAlert").innerHTML = result.calcium;
            document.querySelector("#nitAlert").innerHTML = result.nitrates;
        },
        error: function (error) {
            console.log("ERROR:" + JSON.stringify(error));
        }
    });
}

function alertCount() {
    $.ajax({
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/alert",
        success: function (result) {
            // Display elements
            let count = 0;
            if (result.temperature != "No hay alertas") count++;
            if (result.humidity != "No hay alertas") count++;
            if (result.conductivity != "No hay alertas") count++;
            if (result.LUX != "No hay alertas") count++;
            if (result.potassium != "No hay alertas") count++;
            if (result.sodium != "No hay alertas") count++;
            if (result.calcium != "No hay alertas") count++;
            if (result.nitrates != "No hay alertas") count++;
            document.querySelector("#alertCount").innerHTML = count;
        },
        error: function (error) {
            console.log("ERROR:" + JSON.stringify(error));
        }
    });

}