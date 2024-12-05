const apiKey = "a72818d3e7534732ad9205151240512";  // Replace with your actual WeatherAPI key

// Function to fetch weather data from WeatherAPI
async function getWeather(city) {
    // Construct the URL for WeatherAPI
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);  // Log the full response for debugging

        // Check if the city is valid
        if (data.error) {
            throw new Error(data.error.message);  // Show error message if city is not found
        }

        displayWeather(data);  // Display weather data
    } catch (error) {
        displayError(error.message);  // Display error message if something goes wrong
    }
}

// Function to display weather data
function displayWeather(data) {
    const { location, current } = data;
    const temperature = current.temp_c;  // Current temperature in Celsius
    const description = current.condition.text;  // Weather condition description
    const icon = current.condition.icon;  // Icon for the weather condition

    // Display the data in HTML
    document.getElementById("weather").innerHTML = `
        <h2 style="color: Purple;">Weather in ${location.name}</h2>
        <div class="icon-container">
            <img src="https:${icon}" alt="${description}" class="weather-icon">
        </div>
        <p style="color: purple;"><strong>Temperature:</strong> ${temperature}°C</p>
        <p style="color: purple;"><strong>Description:</strong> ${description}</p>
    `;
    document.getElementById("error").innerHTML = "";  // Clear previous errors
}

// Function to display error messages
function displayError(message) {
    document.getElementById("error").innerHTML = `<p style="color: red;"><strong>Error:</strong> ${message}</p>`;
    document.getElementById("weather").innerHTML = "";  // Clear previous weather data
}

// Event listener for button click
document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();

    // Check if the city input is empty
    if (!city) {
        displayError("Please enter a city name.");
        return;
    }

    // Call the API to get weather data
    getWeather(city);
});
