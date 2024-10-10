const monthSelect = document.getElementById('month-select');
const statisticsContainer = document.getElementById('statistics-container');

// Function to fetch and display statistics
async function fetchStatistics() {
    const month = monthSelect.value;
    const response = await fetch(`/api/statistics?month=${month}`);
    const data = await response.json();

    statisticsContainer.innerHTML = `
        <div class="stat-box">
            <h3>Total Sale Amount</h3>
            <p>$${data.totalSaleAmount.toFixed(2)}</p>
        </div>
        <div class="stat-box">
            <h3>Total Sold Items</h3>
            <p>${data.totalSoldItems}</p>
        </div>
        <div class="stat-box">
            <h3>Total Not Sold Items</h3>
            <p>${data.totalNotSoldItems}</p>
        </div>
    `;
}

// Event listeners
monthSelect.addEventListener('change', fetchStatistics);

// Initial load
fetchStatistics();