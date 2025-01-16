let dataPointCount = 0;
let chart = null;

function addDataPoint() {
    dataPointCount++;
    const dataPointDiv = document.createElement('div');
    dataPointDiv.className = 'data-point';
    dataPointDiv.innerHTML = `
        <h3>Data Point ${dataPointCount}</h3>
        <div class="form-group">
            <label for="x${dataPointCount}">X Coordinate:</label>
            <input type="number" id="x${dataPointCount}" name="x${dataPointCount}" required>
        </div>
        <div class="form-group">
            <label for="y${dataPointCount}">Y Coordinate:</label>
            <input type="number" id="y${dataPointCount}" name="y${dataPointCount}" required>
        </div>
        <button type="button" class="btn btn-danger" onclick="removeDataPoint(this)">Remove</button>
    `;
    document.getElementById('dataPoints').appendChild(dataPointDiv);
}

function removeDataPoint(button) {
    button.parentElement.remove();
}

function generateChart(e) {
    e.preventDefault();

    const dataPoints = document.querySelectorAll('.data-point');
    const data = [];

    dataPoints.forEach((dataPoint, index) => {
        const x = Number(dataPoint.querySelector(`#x${index + 1}`).value);
        const y = Number(dataPoint.querySelector(`#y${index + 1}`).value);
        data.push({ x, y });
    });

    // Sort data points by x-coordinate
    data.sort((a, b) => a.x - b.x);

    const chartData = {
        datasets: [{
            label: 'Line Chart',
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Dynamic Line Chart'
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'X Axis'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y Axis'
                    }
                }
            }
        }
    };

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('lineChart').getContext('2d');
    chart = new Chart(ctx, config);
}

document.getElementById('addDataPoint').addEventListener('click', addDataPoint);
document.getElementById('lineChartForm').addEventListener('submit', generateChart);

// Add initial data points
addDataPoint();
addDataPoint();

