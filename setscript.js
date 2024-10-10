const monthSelect = document.getElementById('month-select');
const searchInput = document.getElementById('search-input');
const transactionsTable = document.getElementById('transactions-table');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const statisticsContainer = document.getElementById('statistics-container');
const barChart = document.getElementById('bar-chart');

let currentPage = 1;
let totalPages = 1;

// Function to fetch and display transactions
async function fetchTransactions() {
    const month = monthSelect.value;
    const searchText = searchInput.value;
    const response = await fetch(`/api/transactions?month=${month}&search=${searchText}&page=${currentPage}`);
    const data = await response.json();

    // Update table
    const tbody = transactionsTable.querySelector('tbody');
    tbody.innerHTML = '';
    data.transactions.forEach(transaction => {
        const row = tbody.insertRow();
        row.insertCell().textContent = new Date(transaction.dateOfSale).toLocaleDateString();
        row.insertCell().textContent = transaction.productTitle;
        row.insertCell().textContent = transaction.productDescription;
        row.insertCell().textContent = `$${transaction.price.toFixed(2)}`;
        row.insertCell().textContent = transaction.category;
    });

    // Update pagination
    totalPages = data.totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

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

// Function to fetch and display bar chart
async function fetchBarChartData() {
    const month = monthSelect.value;
    const response = await fetch(`/api/barchart?month=${month}`);
    const data = await response.json();

    const ctx = barChart.getContext('2d');
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
monthSelect.addEventListener('change', () => {
    currentPage = 1;
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
});

searchInput.addEventListener('input', () => {
    currentPage = 1;
    fetchTransactions();
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchTransactions();
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchTransactions();
    }
});

// Initial load
fetchTransactions();
fetchStatistics();
fetchBarChartData();