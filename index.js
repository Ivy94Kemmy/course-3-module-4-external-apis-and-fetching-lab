// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const weatherAlerts = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

async function fetchWeatherAlerts(state) {
    try {
        const response = await fetch(
            `https://api.weather.gov/alerts/active?area=${state}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch weather alerts. Check the state code.");
        }
        const data = await response.json();
        console.log(data);
        displayAlerts(data);
    } catch(error) {
        alertsDisplay.innerHTML = "";
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
        console.log(error.message);
    }
}
function displayAlerts(data) {
    alertsDisplay = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden"); 
    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${data.features.lenghth}`;
    weatherAlerts.appendChild(summary);
    const alertList = document.createElement("ul");
    data.features.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = 
        feature.properties.headline || "No headline available";
        alertList.appendChild(li);
    });
    alertList.appendChild(li);
}
fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();
    alertsDisplay.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
    if (!state) {
        errorMessage.textContent = "Please enter a state abbreviation.";
        errorMessage.classList.remove("hidden");
        return;
    }
    if (!/^[A-Z]{2}$/.test(state)) {
        errorMessage.textContent =
        "Please enter a valid two-letter state abbreviation.";
        errorMessage.classList.remove("hidden"); 
        return;
    }
    stateInput.value = "";
    fetchWeatherAlerts(state);
});