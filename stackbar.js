let categoryCount = 0;
let chart = null;

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
            <label for="data${categoryCount}1">Dataset 1:</label>
            <input type="number" id="data${categoryCount}1" name="data${categoryCount}1" required>
        </div>
        <div class="form-group">
            <label for="data${categoryCount}2">Dataset 2:</label>
            <input type="number" id="data${categoryCount}2" name="data${categoryCount}2" required>
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
    const dataset1 = [];
    const dataset2 = [];

    categories.forEach((category, index) => {
        labels.push(category.querySelector(`#category${index + 1}`).value);
        dataset1.push(Number(category.querySelector(`#data${index + 1}1`).value));
        dataset2.push(Number(category.querySelector(`#data${index + 1}2`).value));
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataset1,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Dataset 2',
                data: dataset2,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Dynamic Stacked Bar Chart'
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    };

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('stackedBarChart').getContext('2d');
    chart = new Chart(ctx, config);
}

document.getElementById('addCategory').addEventListener('click', addCategory);
document.getElementById('stackedBarChartForm').addEventListener('submit', generateChart);

// Add initial category
addCategory();

