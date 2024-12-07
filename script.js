const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";

const resultDiv = document.getElementById("result");

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertButton = document.getElementById("convert");
const amountInput = document.getElementById('amount');

// Fetch exchange rates and populate currency dropdowns
async function fetchExchangeRates() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();

        // Populate currency dropdowns
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;
            option2.value = currency;
            option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        // Set default selections
        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
    } catch (error) {
        console.error(error);
        resultDiv.textContent = "Error fetching exchange rates.";
    }
}

// Perform the conversion
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates");
        }
        const data = await response.json();

        // Calculate conversion
        const rateFromUSD = data.rates[from];
        const rateToUSD = data.rates[to];
        const convertedAmount = (amount / rateFromUSD) * rateToUSD;

        // Display result
        resultDiv.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
    } catch (error) {
        console.error(error);
        resultDiv.textContent = "Error performing conversion.";
    }
}

// Event Listener
convertButton.addEventListener("click", convertCurrency);

// Initialize dropdowns on page load
fetchExchangeRates();
