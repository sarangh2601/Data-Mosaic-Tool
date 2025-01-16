let categoryCount = 0;
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

function addCategory() {
    categoryCount++;
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    categoryDiv.innerHTML = `
        <h3>Category ${categoryCount}</h3>
        <div class="form-group">
            <label for="category${categoryCount}">Category Name:</label>
            <input type="text" id="category${categoryCount}" name="category${categoryCount}" required>
        </div>
        <div class="form-group">
            <label for="data${categoryCount}">Value:</label>
            <input type="number" id="data${categoryCount}" name="data${categoryCount}" required>
        </div>
        <button type="button" class="btn btn-danger" onclick="removeCategory(this)">Remove</button>
    `;
    document.getElementById('categories').appendChild(categoryDiv);
}

function removeCategory(button) {
    button.parentElement.remove();
}

function generateChart(e) {
    e.preventDefault();

    const categories = document.querySelectorAll('.category');
    const labels = [];
    const data = [];

    categories.forEach((category, index) => {
        labels.push(category.querySelector(`#category${index + 1}`).value);
        data.push(Number(category.querySelector(`#data${index + 1}`).value));
    });

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Values',
            data: data,
            backgroundColor: colors.slice(0, data.length),
        }]
    };

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'Dynamic Row Chart'
                },
                legend: {
                    display: false
                }
            },
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    };

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('rowChart').getContext('2d');
    chart = new Chart(ctx, config);
}

document.getElementById('addCategory').addEventListener('click', addCategory);
document.getElementById('rowChartForm').addEventListener('submit', generateChart);

// Add initial category
addCategory();

