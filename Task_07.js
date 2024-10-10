const monthSelect = document.getElementById('month-select');
const searchInput = document.getElementById('search-input');
const transactionsTable = document.getElementById('transactions-table');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

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

// Event listeners
monthSelect.addEventListener('change', () => {
    currentPage = 1;
    fetchTransactions();
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