// script.js
document.getElementById('search-btn').addEventListener('click', fetchWeather);

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

function fetchWeather() {
  const city = document.getElementById('city-input').value;
  if (city) {
    fetchCurrentWeather(city);
    fetchForecast(city);
  } else {
    alert('Please enter a city name');
  }
}

function fetchCurrentWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayCurrentWeather(data))
    .catch(error => console.error('Error fetching current weather:', error));
}

function displayCurrentWeather(data) {
  const weatherInfo = `
    <p><strong>City:</strong> ${data.name}</p>
    <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  document.getElementById('current-weather-info').innerHTML = weatherInfo;
}

function fetchForecast(city) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => displayForecast(data))
    .catch(error => console.error('Error fetching forecast:', error));
}

function displayForecast(data) {
  let forecastInfo = '';
  for (let i = 0; i < data.list.length; i += 8) {
    forecastInfo += `
      <div>
        <p><strong>Date:</strong> ${new Date(data.list[i].dt_txt).toDateString()}</p>
        <p><strong>Temperature:</strong> ${data.list[i].main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.list[i].weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.list[i].main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.list[i].wind.speed} m/s</p>
      </div>
    `;
  }
  document.getElementById('forecast-info').innerHTML = forecastInfo;
}
