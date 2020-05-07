let dataTemp= [];
let dataHum= [];
let dataCon= [];
let dataLux= [];
let dataPot= [];
let dataSod= [];
let dataCal= [];
let dataNitr= [];

window.addEventListener('load', () => {
    loadData();
    loadMinerals();
    let ctx = document.getElementById('temperatureChart').getContext('2d');
    createChart(ctx, "Temperatura (°C)", dataTemp);
    ctx = document.getElementById('humidityChart').getContext('2d');
    createChart(ctx, "Humedad (%)", dataHum);
    ctx = document.getElementById('conductivityChart').getContext('2d');
    createChart(ctx, "Conductividad (S/cm)", dataCon);
    ctx = document.getElementById('luxChart').getContext('2d');
    createChart(ctx, "Iluminación (LUX)", dataLux);
    ctx = document.getElementById('potassiumChart').getContext('2d');
    createChart(ctx, "Potasio (kg/ha)", dataPot);
    ctx = document.getElementById('sodiumChart').getContext('2d');
    createChart(ctx, "Sodio (kg/ha)", dataSod);
    ctx = document.getElementById('calciumChart').getContext('2d');
    createChart(ctx, "Calcio (kg/ha)", dataCal);
    ctx = document.getElementById('nitratesChart').getContext('2d');
    createChart(ctx, "Nitratos (kg/ha)", dataNitr);

});


function createChart(canvas, title, data) {
    let colors = [];
    let labels = [];
    for(let index=0;index<30;index++){
        labels.push(index);
        colors.push('rgba(0, 0, 0, 1)');
    }
    let myChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: [
                    'rgba(1, 1, 1, 0)'
                ],
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },

                }]
            }
        }
    });
}

function loadData() {
    $.ajax({
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/measurement",
        async: false,
        success: function (result) {
            // Do something
            let averageTemp, averageHum, averageCond, averageIllum;
            let countTemp = 0, countHum = 0, countCond = 0, countIllum = 0;
            for (let index = 0; index < result.length; ++index) {
                countTemp += Number(result[index]['payload']['temperature']);
                countHum += Number(result[index]['payload']['humidity']);
                countCond += Number(result[index]['payload']['conductivity']);
                countIllum += Number(result[index]['payload']['LUX']);
                dataTemp.push(result[index]['payload']['temperature']);
                dataHum.push(result[index]['payload']['humidity']);
                dataCon.push(result[index]['payload']['conductivity']);
                dataLux.push(result[index]['payload']['LUX']);
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
        },
        error: function (error) {
            console.log("ERROR:" + JSON.stringify(error));
        }
    });
}

function loadMinerals() {
    $.ajax({
        url: "https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/minerals",
        async: false,
        success: function (result) {
            // Do something
            let averagePot, averageSod, averageCal, averageNitr;
            let countPot = 0, countSod = 0, countCal = 0, countNitr = 0;
            for (let index = 0; index < result.length; ++index) {
                countPot += Number(result[index]['payload']['potassium']);
                countSod += Number(result[index]['payload']['sodium']);
                countCal += Number(result[index]['payload']['calcium']);
                countNitr += Number(result[index]['payload']['nitrates']);
                dataPot.push(result[index]['payload']['potassium']);
                dataSod.push(result[index]['payload']['sodium']);
                dataCal.push(result[index]['payload']['calcium']);
                dataNitr.push(result[index]['payload']['nitrates']);
            }

            averagePot = countPot / result.length;
            averageSod = countSod / result.length;
            averageCal = countCal / result.length;
            averageNitr = countNitr / result.length;
            // Display elements
            document.getElementById('avgPot').innerHTML = averagePot.toFixed(2) + " kg/ha";
            document.getElementById('avgSod').innerHTML = averageSod.toFixed(2) + " kg/ha";
            document.getElementById('avgCal').innerHTML = averageCal.toFixed(2) + " kg/ha";
            document.getElementById('avgNitr').innerHTML = averageNitr.toFixed(2) + " kg/ha";
        },
        error: function (error) {
            console.log("ERROR:" + JSON.stringify(error));
        }
    });
}