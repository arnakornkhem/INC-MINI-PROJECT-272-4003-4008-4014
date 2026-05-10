// LED Control (Remains exactly the same)
function turnOnLED(){
    document.getElementById("ledStatus").innerHTML = "LED Status: ON";
    document.getElementById("lamp").className = "lamp-on";
    console.log("LED ON");
}

function turnOffLED(){
    document.getElementById("ledStatus").innerHTML = "LED Status: OFF";
    document.getElementById("lamp").className = "lamp-off";
    console.log("LED OFF");
}

// ----------------------------------------------------
// NEW: ADC Monitoring with Live Graph
// ----------------------------------------------------

// 1. Setup the Chart.js Graph
const ctx = document.getElementById('adcChart').getContext('2d');
const adcChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // This will hold our time markers
        datasets: [{
            label: 'Sensor Value (0-1023)',
            data: [], // This will hold our random numbers
            borderColor: '#2196F3', // Blue line
            backgroundColor: 'rgba(33, 150, 243, 0.2)', // Light blue fill under line
            borderWidth: 2,
            fill: true,
            tension: 0.4 // Makes the line curved and smooth
        }]
    },
    options: {
        scales: {
            y: {
                min: 0,
                max: 1024 // Lock the Y-axis to our max ADC value
            }
        },
        animation: false // Turn off default animations so live updates look smoother
    }
});

// 2. Feed data to the Chart every second
let timeCounter = 0;

setInterval(function(){

    // Generate random ADC value
    let adc = Math.floor(Math.random() * 1024);
    
    // Update the text number
    document.getElementById("adcValue").innerHTML = adc;

    // Add the new data to the chart
    adcChart.data.labels.push(timeCounter + 's');
    adcChart.data.datasets[0].data.push(adc);

    // Keep only the last 15 data points so the graph scrolls and doesn't get crushed
    if (adcChart.data.labels.length > 15) {
        adcChart.data.labels.shift(); // Remove oldest time label
        adcChart.data.datasets[0].data.shift(); // Remove oldest data point
    }

    // Tell the chart to redraw with the new data
    adcChart.update();
    
    timeCounter++;

}, 1000);