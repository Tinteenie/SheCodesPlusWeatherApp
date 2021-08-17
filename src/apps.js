let currentTime = new Date();
console.log(currentTime);

let currentDate = currentTime.getDate();

let currentMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonth = currentMonths[currentTime.getMonth()];

let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = currentTime.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let currentSecond = currentTime.getSeconds();
if (currentSecond < 10) {
  currentSecond = `0${currentSecond}`;
}
let currentYear = currentTime.getFullYear();

let currentDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = currentDays[currentTime.getDay()];

let todaysDate = document.querySelector("#current-day");
todaysDate.innerHTML = `<strong>Last updated on</strong>: ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

let todaysTime = document.querySelector("#current-time");
todaysTime.innerHTML = `<strong>Last updated at</strong>: ${currentHour}: ${currentMinute}: ${currentSecond}`;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "846acd27931c9d626c32650564c67fcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;

  fahrenheitTemperature = response.data.main.temp;

  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;

  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  descriptionElement.innerHTML = `<strong>${description}</strong>`;

  let feelsLikeElement = document.querySelector("#feels-like-temperature");
  let feelsLikeTemperature = Math.round(response.data.main.feels_like);
  feelsLikeElement.innerHTML = `<strong> Feels like</strong>: ${feelsLikeTemperature}˚F`;

  let highTemperatureElement = document.querySelector("#high-temperature");
  let highTemperature = Math.round(response.data.main.temp_max);
  highTemperatureElement.innerHTML = `<strong>High</strong>:${highTemperature}˚F`;

  let lowTemperatureElement = document.querySelector("#low-temperature");
  let lowTemperature = Math.round(response.data.main.temp_min);
  lowTemperatureElement.innerHTML = `<strong> Low</strong>: ${lowTemperature}˚F`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `<strong>Humidity</strong>: ${humidity}%`;

  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `<strong>Wind Speed</strong>: ${wind} mph`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(cityName) {
  let apiKey = "846acd27931c9d626c32650564c67fcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let cityName = document.querySelector("#location-input");
  cityName.innerHTML = cityName.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

function searchLocation(position) {
  let apiKey = "846acd27931c9d626c32650564c67fcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}
function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", displayCurrentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = (5 / 9) * (fahrenheitTemperature - 32);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Upland");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
              <div class="col-2">
                <div class="date-forecast">${formatDay(forecastDay.dt)}</div>
                
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  class="forecast-weather-icon"
                />
                <div class="forecast-description">
                ${forecastDay.weather[0].description}
                
                </div>
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}˚</span>
                  <span class="weather-forecast-min">${Math.round(
                    forecastDay.temp.min
                  )}˚</span>
                </div>
              </div>    
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
