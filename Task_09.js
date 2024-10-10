const monthSelect = document.getElementById('month-select');
const barChartCanvas = document.getElementById('bar-chart');

// Function to fetch and display bar chart data
async function fetchBarChartData() {
    const month = monthSelect.value;
    const response = await fetch(`/api/barchart?month=${month}`);
    const data = await response.json();

    const ctx = barChartCanvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Number of Items',
                data: Object.values(data),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Items'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Price Range'
                    }
                }
            }
        }
    });
}

// Event listeners
monthSelect.addEventListener('change', fetchBarChartData);

// Initial load
fetchBarChartData();