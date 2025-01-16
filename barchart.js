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
            <label for="category${dataPointCount}">Category:</label>
            <input type="text" id="category${dataPointCount}" name="category${dataPointCount}" required>
        </div>
        <div class="form-group">
            <label for="value${dataPointCount}">Value:</label>
            <input type="number" id="value${dataPointCount}" name="value${dataPointCount}" required>
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
        labels.push(dataPoint.querySelector(`#category${index + 1}`).value);
        data.push(Number(dataPoint.querySelector(`#value${index + 1}`).value));
    });

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Bar Chart Data',
            data: data,
            backgroundColor: colors.slice(0, data.length),
            borderColor: colors.slice(0, data.length).map(color => color.replace('0.6', '1')),
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Dynamic Bar Chart'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('barChart').getContext('2d');
    chart = new Chart(ctx, config);
}

document.getElementById('addDataPoint').addEventListener('click', addDataPoint);
document.getElementById('barChartForm').addEventListener('submit', generateChart);

// Add initial data points
addDataPoint();
addDataPoint();

