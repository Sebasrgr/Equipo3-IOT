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
            sessionStorage.setItem("token",token['access_token']);
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
            document.getElementById('avgCond').innerHTML = averageCond.toFixed(2) + " S/cm";
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
        data: manualInfo,
        success: function (token) {
            // Do something
            alert("Guardado")
        },
        error: function (error) {
            alert("Error en guardado, intente nuevamente")
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
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/login",
        data: {
            username: usuarioR,
            password: contraseñaR,
            email: emailR,
            phone: phoneR,
            name: nameR
        },
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