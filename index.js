// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.getElementById("state");
const fetchButton = document.getElementById("fetch-weather");
const weatherAlerts = document.getElementById("weather-alerts");
const errorMessage = document.getElementById("error-message");

async function fetchWeatherAlerts(state) {
    try {
        const response = await fetch(
            `https://api.weather.gov/alerts/active?area=${state}`
        );
        if (!response.ok) {
            throw new Error("Unable to fetch weather alerts. Check the state code.");
        }
        const data = await response.json();
        displayAlerts(data);
    } catch(error) {
        weatherAlerts.innerHTML = "";
        errorMessage.textContent = error.message;
        errorMessage.hidden = false;
        console.log(error.message);
    }
}
function displayAlerts(data) {
    weatherAlerts.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.hidden = true;
    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${data.features.lenghth}`;
    weatherAlerts.appendChild(summary);
    const alertList = document.createElement("ul");
    data.features.forEach((feature) => {
        const listItem = document.createElement("li");
        listItem.textContent =
        feature.properties.headline || "No headline available";
        alertList.appendChild(listItem);
    });
    weatherAlerts.appendChild(alertList);
}
fetchButton.addEventListener("click", () => {
    const state = stateInput.ariaValueMax.trim().toUpperCase();
    weatherAlerts.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.hidden = true;
    if (!state) {
        errorMessage.textContent = "Please enter a state abbreviation.";
        errorMessage.hidden = false;
        return;
    }
    if (!/^[A-Z]{2}$/.test(state)) {
        errorMessage.textContent =
        "Please enter a valid two-letter state abbreviation.";
        errorMessage.hidden = false;
        return;
    }
    stateInput.value = "";
    fetchWeatherAlerts(state);
});