window.addEventListener('load', () => {
    let ctx = document.getElementById('temperatureChart').getContext('2d');
    createChart(ctx, "Temperatura (°C)", []);
    ctx = document.getElementById('humidityChart').getContext('2d');
    createChart(ctx, "Humedad (%)", []);
    ctx = document.getElementById('conductivityChart').getContext('2d');
    createChart(ctx, "Conductividad (S/cm)", []);
    ctx = document.getElementById('luxChart').getContext('2d');
    createChart(ctx, "Iluminación (LUX)", []);
    ctx = document.getElementById('potassiumChart').getContext('2d');
    createChart(ctx, "Potasio (mg/l)", []);
    ctx = document.getElementById('sodiumChart').getContext('2d');
    createChart(ctx, "Sodio (mg/l)", []);
    ctx = document.getElementById('calciumChart').getContext('2d');
    createChart(ctx, "Calcio (mg/l)", []);
    ctx = document.getElementById('nitratesChart').getContext('2d');
    createChart(ctx, "Nitratos (mg/l)", []);

});


function createChart(canvas, title, values) {
    let myChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: ['25-mar', '26-mar', '27-mar', '28-mar', '29-mar', '30-mar'],
            datasets: [{
                label: title,
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(1, 1, 1, 0)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)'
                ],
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