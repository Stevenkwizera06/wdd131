// Get the current year for the copyright
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date
document.getElementById("lastModified").innerHTML = "Last Modification: " + document.lastModified;

// Wind Chill Calculation
// Static values matching the displayed weather data
const temperature = 10; // °C
const windSpeed = 8; // km/h

// Function to calculate wind chill (one line of code)
function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

// Check conditions before calculating wind chill
// Conditions: Temperature <= 10°C AND Wind speed > 4.8 km/h
const windChillElement = document.getElementById("windChill");

if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = Math.round(windChill * 10) / 10 + "°C";
} else {
    windChillElement.textContent = "N/A";
}

