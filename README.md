# Weather App — Research & Project Documentation

> 🚀 **Visit the Live Weather App:** [Open Weather App](https://sandeep212967.github.io/Weather-app/)

---

## 1. Project Overview

The Weather App is a responsive web application that allows users to enter a city or location and view its current weather information.

The application uses the **WeatherAPI.com Current Weather API** and is built with:

- HTML
- CSS
- JavaScript
- Fetch API
- WeatherAPI.com

### Main Goal

Allow a user to:

1. Enter a location.
2. Send the location to the WeatherAPI.
3. Receive current weather data.
4. Display the temperature and related weather information in a clean UI.

---

## 2. API Information

### API Provider

**WeatherAPI.com**

### Endpoint

```text
https://api.weatherapi.com/v1/current.json
```

### Example Request

```text
https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=New%20Delhi&aqi=yes
```

### Parameters

| Parameter | Purpose |
|---|---|
| `key` | WeatherAPI API key |
| `q` | City/location entered by the user |
| `aqi` | Controls air-quality data |

Example:

```text
q=New Delhi
```

---

## 3. API Response

The API returns JSON data.

A simplified response structure looks like:

```json
{
  "location": {
    "name": "New Delhi",
    "region": "Delhi",
    "country": "India",
    "localtime": "2026-09-14 21:00"
  },
  "current": {
    "temp_c": 30,
    "feelslike_c": 32,
    "humidity": 70,
    "wind_kph": 12,
    "condition": {
      "text": "Clear",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png"
    }
  }
}
```

---

## 4. Important API Fields

### Location

```javascript
data.location.name
```

Returns the city/location name.

```javascript
data.location.country
```

Returns the country.

```javascript
data.location.region
```

Returns the region/state.

### Temperature

```javascript
data.current.temp_c
```

Returns the current temperature in Celsius.

### Feels Like

```javascript
data.current.feelslike_c
```

Returns the feels-like temperature.

### Humidity

```javascript
data.current.humidity
```

Returns humidity percentage.

### Wind

```javascript
data.current.wind_kph
```

Returns wind speed in kilometers per hour.

### Weather Condition

```javascript
data.current.condition.text
```

Returns a description such as:

- Sunny
- Clear
- Cloudy
- Partly cloudy
- Light rain
- Heavy rain

### Weather Icon

```javascript
data.current.condition.icon
```

Returns the URL/path of the weather icon.

---

# 5. Project Structure

```text
weather-app/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# 6. HTML Research

The HTML file is responsible for creating the structure of the application.

Important elements:

```html
<input 
    type="text"
    id="locationInput"
    placeholder="Enter city name"
>
```

This allows the user to enter a location.

The search button:

```html
<button id="weatherBtn">
    Get Weather
</button>
```

is used to start the API request.

The temperature can be displayed using:

```html
<span id="temperature">--</span>
<span>°C</span>
```

The weather icon:

```html
<img id="weatherIcon" src="" alt="Weather">
```

---

# 7. CSS Research

CSS is used to create a professional and responsive interface.

Important UI components:

- Gradient background
- Search box
- Search button
- Weather card
- Temperature display
- Weather icon
- Weather details
- Responsive mobile layout

Example card styling:

```css
.weather-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}
```

---

# 8. JavaScript Research

JavaScript handles:

- User input
- API requests
- JSON processing
- Updating HTML
- Error handling
- Enter-key functionality

---

## 9. Getting User Input

```javascript
const locationInput =
    document.getElementById("locationInput");

const location =
    locationInput.value.trim();
```

The `trim()` function removes unnecessary spaces.

Example:

```text
"   New Delhi   "
```

becomes:

```text
"New Delhi"
```

---

# 10. Sending API Request

The Fetch API can be used to request weather information.

```javascript
const url =
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;

const response = await fetch(url);

const data = await response.json();
```

### Why `encodeURIComponent()`?

It safely converts user input into a URL-compatible format.

For example:

```text
New Delhi
```

becomes:

```text
New%20Delhi
```

This prevents spaces and special characters from causing URL problems.

---

# 11. Async/Await

The API request is asynchronous.

```javascript
async function getWeather() {
    const response = await fetch(url);
    const data = await response.json();
}
```

### `async`

Marks the function as asynchronous.

### `await`

Waits for the API response before continuing.

---

# 12. Displaying Temperature

After receiving the API response:

```javascript
temperature.textContent =
    Math.round(data.current.temp_c);
```

The `Math.round()` function removes decimal values.

Example:

```text
30.7°C
```

becomes:

```text
31°C
```

---

# 13. Displaying Weather Information

```javascript
city.textContent =
    data.location.name;

country.textContent =
    `${data.location.region}, ${data.location.country}`;

condition.textContent =
    data.current.condition.text;

feelsLike.textContent =
    `${Math.round(data.current.feelslike_c)}°C`;

humidity.textContent =
    `${data.current.humidity}%`;

wind.textContent =
    `${data.current.wind_kph} km/h`;
```

---

# 14. Weather Icon

The API provides the weather icon.

```javascript
weatherIcon.src =
    "https:" + data.current.condition.icon;
```

The API may return:

```text
//cdn.weatherapi.com/...
```

Adding `https:` creates a complete URL.

---

# 15. Error Handling

API requests can fail.

Examples:

- Invalid city
- Empty input
- Invalid API key
- Network problem
- API limit exceeded

Use:

```javascript
try {
    // API request
} catch (error) {
    console.error(error);
}
```

A better implementation checks the HTTP response:

```javascript
if (!response.ok) {
    throw new Error(
        data.error?.message ||
        "Unable to fetch weather."
    );
}
```

---

# 16. User Flow

```text
User opens website
        ↓
User enters location
        ↓
User clicks "Get Weather"
        ↓
JavaScript reads location
        ↓
JavaScript creates API URL
        ↓
Fetch API sends request
        ↓
WeatherAPI returns JSON
        ↓
JavaScript reads response
        ↓
HTML elements are updated
        ↓
Weather card is displayed
```

---

# 17. Example

### User Input

```text
New Delhi
```

### API Request

```text
/current.json?key=API_KEY&q=New%20Delhi&aqi=yes
```

### Information Displayed

```text
New Delhi
India

30°C

Clear

Feels Like: 32°C
Humidity: 70%
Wind: 12 km/h
```

---

# 18. Features Implemented

## Basic Features

- [x] Location search
- [x] Current temperature
- [x] Weather condition
- [x] Weather icon
- [x] Feels-like temperature
- [x] Humidity
- [x] Wind speed
- [x] Country and region
- [x] Error message
- [x] Responsive design
- [x] Enter-key search

---

# 19. Future Features

The project can be upgraded with:

### 1. Search History

Store previously searched cities:

```javascript
localStorage.setItem(
    "weatherHistory",
    JSON.stringify(history)
);
```

Possible UI:

```text
Recent Searches

New Delhi
Mumbai
Lucknow
Bangalore
```

### 2. 7-Day Forecast

Use the WeatherAPI forecast endpoint to display future weather.

### 3. Current Location

Use the browser Geolocation API:

```javascript
navigator.geolocation.getCurrentPosition(...)
```

Then use latitude and longitude as the WeatherAPI query.

### 4. Celsius/Fahrenheit Toggle

Add:

```text
°C | °F
```

### 5. Air Quality

Since the request uses:

```text
aqi=yes
```

the application can display air-quality information.

### 6. Sunrise and Sunset

Display:

```text
🌅 Sunrise
🌇 Sunset
```

### 7. Weather-Based Background

Change the background depending on the weather.

Example:

```text
Sunny → bright background
Rain → rainy background
Cloudy → cloudy background
Night → dark background
```

### 8. Loading Animation

Show a spinner while the API request is running.

### 9. Better Error Messages

Examples:

```text
City not found
```

```text
Please check your internet connection
```

```text
API request failed
```

---

# 20. Security Research

The API key should **not** normally be exposed in client-side JavaScript.

Current development approach:

```javascript
const API_KEY = "YOUR_API_KEY";
```

This is easy for learning but is visible to anyone who opens the browser's developer tools.

## Production Approach

Use:

```text
Frontend
   ↓
Your Backend
   ↓
WeatherAPI
```

The API key stays on the backend.

Example architecture:

```text
Browser
  |
  | GET /api/weather?city=Delhi
  ↓
Node.js / Express Server
  |
  | API key stored in .env
  ↓
WeatherAPI
```

Example environment variable:

```env
WEATHER_API_KEY=your_api_key
```

---

# 21. Recommended Tech Stack

For the beginner version:

```text
HTML
CSS
JavaScript
WeatherAPI
```

For an advanced portfolio version:

```text
Frontend:
HTML + CSS + JavaScript
        OR
React

Backend:
Node.js
Express.js

API:
WeatherAPI

Storage:
LocalStorage
        OR
MongoDB
```

---

# 22. Learning Concepts From This Project

This project is useful for learning:

- DOM manipulation
- JavaScript events
- `fetch()`
- REST APIs
- JSON
- Async/Await
- Error handling
- Template literals
- URL parameters
- LocalStorage
- Responsive CSS
- API integration
- Frontend project structure

---

# 23. Development Roadmap

## Phase 1 — Basic App

- Create HTML
- Create CSS
- Add location input
- Connect WeatherAPI
- Display temperature

## Phase 2 — Better UI

- Weather icons
- Weather card
- Responsive design
- Loading state
- Error handling

## Phase 3 — More Weather Data

- Humidity
- Wind
- Feels-like temperature
- Air quality
- Sunrise/sunset

## Phase 4 — Advanced Features

- Search history
- 7-day forecast
- Current location
- Celsius/Fahrenheit
- Dynamic background

## Phase 5 — Production

- Node.js backend
- Environment variables
- API key protection
- Deployment
- Performance optimization

---

# 24. Final Project Goal

The final application should provide a professional experience:

```text
┌─────────────────────────────────────┐
│          🌤️ Weather App             │
│                                     │
│  [ Enter city/location ] [ Search ] │
│                                     │
│            New Delhi                │
│              India                  │
│                                     │
│               🌤️                    │
│              30°C                   │
│              Clear                  │
│                                     │
│  Feels Like   Humidity     Wind     │
│     32°C        70%       12 km/h   │
│                                     │
│       Last updated: 21:00           │
└─────────────────────────────────────┘
```

---

## Conclusion

This Weather App is a good beginner-to-intermediate JavaScript project because it combines a real-world API with frontend development.

The core concept is:

```text
User Input
    ↓
JavaScript
    ↓
WeatherAPI
    ↓
JSON Response
    ↓
DOM Manipulation
    ↓
Weather Information
```

The project can later be expanded into a complete weather dashboard suitable for a portfolio.
