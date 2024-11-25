// scripts.js

// Function to validate the login form
function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === '' || password === '') {
        alert('Both fields are required!');
        return false;
    }
    return true;
}

// Function to fetch cryptocurrency data from a public API
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            qs: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: false
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        updateCryptoMarket(data);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

// Function to update the DOM with fetched cryptocurrency data
function updateCryptoMarket(data) {
    const cryptoDataDiv = document.getElementById('crypto-data');
    cryptoDataDiv.innerHTML = ''; // Clear existing data

    data.forEach(coin => {
        const coinElement = document.createElement('div');
        coinElement.className = 'coin';
        coinElement.innerHTML = `
            <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
            <p>Current Price: $${coin.current_price}</p>
            <p>Market Cap: $${coin.market_cap}</p>
            <p>24h Change: ${coin.price_change_percentage_24h}%</p>
        `;
        cryptoDataDiv.appendChild(coinElement);
    });
}

// Event listener for DOMContentLoaded to ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Attach form validation to the login form
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.onsubmit = validateLoginForm;
    }

    // Fetch and display crypto data if on the crypto-market page
    if (document.getElementById('crypto-data')) {
        fetchCryptoData();
    }
});
