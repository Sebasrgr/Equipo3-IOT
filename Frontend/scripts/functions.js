function login(username, password) {
    $.ajax({
        method: 'POST',
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/login",
        data: {
            username: username,
            password: password
        },
        success: function(token) {
            // Do something
            document.cookie = `token=${token};`;
            window.location('../dashboard.html');
        },
        error: function(error) {
            console.log("ERROR:"+JSON.stringify(error));
        }
      });
}

function verify(token) {
    $.ajax({
        method: 'POST',
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/login/verify",
        data: {
            token: token 
        },
        success: function(token) {
            // Do something if false
            if(token['validation'] == false) {
                document.cookie = `token=`;
                window.location('../index.html');
            }
        },
        error: function(error) {
            console.log("ERROR:"+JSON.stringify(error));
        }
      });
}


function loadAverages() {    
    $.ajax({
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/measurement",
        success: function(result) {
            // Do something
            let averageTemp, averageHum, averageCond,averageIllum;
            let countTemp = 0, countHum = 0, countCond = 0,countIllum = 0;
            for (let index = 0; index < result.length; ++index) {
                console.log(result[index]);
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
            document.getElementById('avgTemp').innerHTML = averageTemp.toFixed(2) +" °C";
            document.getElementById('avgHum').innerHTML = averageHum.toFixed(2) +"%";
            document.getElementById('avgCond').innerHTML = averageCond.toFixed(2) +" S/cm";
            document.getElementById('avgLUX').innerHTML = averageIllum.toFixed(2) +" LUX";
            document.getElementById('measurementsCount').innerHTML = result.length;
        },
        error: function(error) {
            console.log("ERROR:"+JSON.stringify(error));
        }
      });
  }