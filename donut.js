let dataPointCount = 0;
let chart = null;

const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(199, 199, 199, 0.6)',
    'rgba(83, 102, 255, 0.6)',
    'rgba(40, 159, 64, 0.6)',
    'rgba(210, 199, 199, 0.6)'
];

function addDataPoint() {
    dataPointCount++;
    const dataPointDiv = document.createElement('div');
    dataPointDiv.className = 'data-point';
    dataPointDiv.innerHTML = `
        <h3>Data Point ${dataPointCount}</h3>
        <div class="form-group">
            <label for="label${dataPointCount}">Label:</label>
            <input type="text" id="label${dataPointCount}" name="label${dataPointCount}" required>
        </div>
        <div class="form-group">
            <label for="data${dataPointCount}">Value:</label>
            <input type="number" id="data${dataPointCount}" name="data${dataPointCount}" required>
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
    const labels = [];
    const data = [];

    dataPoints.forEach((dataPoint, index) => {
        labels.push(dataPoint.querySelector(`#label${index + 1}`).value);
        data.push(Number(dataPoint.querySelector(`#data${index + 1}`).value));
    });

    const chartData = {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: colors.slice(0, data.length),
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Dynamic Donut Chart'
                }
            }
        }
    };

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('donutChart').getContext('2d');
    chart = new Chart(ctx, config);
}

document.getElementById('addDataPoint').addEventListener('click', addDataPoint);
document.getElementById('donutChartForm').addEventListener('submit', generateChart);

// Add initial data point
addDataPoint();

