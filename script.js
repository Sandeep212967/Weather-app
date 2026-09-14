const API_KEY = "f4d45c1e632747a3891161657261409";

const locationInput = document.getElementById("locationInput");
const weatherBtn = document.getElementById("weatherBtn");
const message = document.getElementById("message");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");


// ==========================
// Get Weather
// ==========================

async function getWeather(location) {

    if (!location) {
        message.textContent = "Please enter a location.";
        return;
    }

    message.textContent = "Loading weather...";

    try {

        const url =
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Location not found");
        }

        // Update weather information
        document.getElementById("city").textContent =
            data.location.name;

        document.getElementById("country").textContent =
            `${data.location.region}, ${data.location.country}`;

        document.getElementById("temperature").textContent =
            Math.round(data.current.temp_c);

        document.getElementById("condition").textContent =
            data.current.condition.text;

        document.getElementById("feelsLike").textContent =
            `${Math.round(data.current.feelslike_c)}°C`;

        document.getElementById("humidity").textContent =
            `${data.current.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.current.wind_kph} km/h`;

        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("updated").textContent =
            data.current.last_updated;

        message.textContent = "";

        // Save successful search
        saveToHistory(data.location.name);

    } catch (error) {

        message.textContent = "❌ " + error.message;

    }
}


// ==========================
// Search Button
// ==========================

weatherBtn.addEventListener("click", () => {

    const location = locationInput.value.trim();

    getWeather(location);

});


// ==========================
// Enter Key Search
// ==========================

locationInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const location = locationInput.value.trim();

        getWeather(location);

    }

});


// ==========================
// Search History
// ==========================

function getHistory() {

    return JSON.parse(
        localStorage.getItem("weatherHistory")
    ) || [];

}


function saveToHistory(city) {

    let history = getHistory();

    // Remove duplicate
    history = history.filter(
        item => item.toLowerCase() !== city.toLowerCase()
    );

    // Add latest search at beginning
    history.unshift(city);

    // Keep only last 8 searches
    history = history.slice(0, 8);

    localStorage.setItem(
        "weatherHistory",
        JSON.stringify(history)
    );

    displayHistory();

}


// ==========================
// Display History
// ==========================

function displayHistory() {

    const history = getHistory();

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML =
            `<p class="no-history">No recent searches</p>`;

        return;
    }

    history.forEach((city, index) => {

        const historyItem = document.createElement("div");

        historyItem.className = "history-item";

        historyItem.innerHTML = `
            <button class="history-city">
                📍 ${city}
            </button>

            <button 
                class="delete-history"
                title="Remove"
            >
                ❌
            </button>
        `;

        // Search city again
        historyItem
            .querySelector(".history-city")
            .addEventListener("click", () => {

                locationInput.value = city;

                getWeather(city);

            });


        // Delete individual history
        historyItem
            .querySelector(".delete-history")
            .addEventListener("click", () => {

                deleteHistory(index);

            });

        historyList.appendChild(historyItem);

    });

}


// ==========================
// Delete History Item
// ==========================

function deleteHistory(index) {

    let history = getHistory();

    history.splice(index, 1);

    localStorage.setItem(
        "weatherHistory",
        JSON.stringify(history)
    );

    displayHistory();

}


// ==========================
// Clear All History
// ==========================

clearHistoryBtn.addEventListener("click", () => {

    localStorage.removeItem("weatherHistory");

    displayHistory();

});


// Load history when website opens
displayHistory();