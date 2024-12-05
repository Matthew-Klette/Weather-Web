const apiKey = "9552c40513c2d88c91fe735dfe7e2882"; // Your API Key

// Function to fetch weather data
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message); // Handle API error
        }

        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Function to display weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`; // OpenWeatherMap Icon

    // Display data in HTML
    document.getElementById("weather").innerHTML = `
        <h2 style="color: Purple;">Weather in ${name}</h2>
        <div class="icon-container">
            <img src="${icon}" alt="${description}" class="weather-icon">
        </div>
        <p style="color: purple;"><strong>Temperature:</strong> ${temperature}°C</p>
        <p style="color: purple;"><strong>Description:</strong> ${description}</p>
    `;
    document.getElementById("error").innerHTML = ""; // Clear previous errors
}

// Function to display error messages
function displayError(message) {
    document.getElementById("error").innerHTML = `<p style="color: red;"><strong>Error:</strong> ${message}</p>`;
    document.getElementById("weather").innerHTML = ""; // Clear previous weather data
}

// Event listener for button click
document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        displayError("Please enter a city name.");
        return;
    }

    getWeather(city);
});
