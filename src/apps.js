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
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;

  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  descriptionElement.innerHTML = `<strong>${description}</strong>`;

  let feelsLikeElement = document.querySelector("#feels-like-temperature");
  let feelsLikeTemperature = Math.round(response.data.main.feels_like);
  feelsLikeElement.innerHTML = `<strong> Feels like</strong>: ${feelsLikeTemperature}˚C`;

  let highTemperatureElement = document.querySelector("#high-temperature");
  let highTemperature = Math.round(response.data.main.temp_max);
  highTemperatureElement.innerHTML = `<strong>High</strong>:${highTemperature}˚C`;

  let lowTemperatureElement = document.querySelector("#low-temperature");
  let lowTemperature = Math.round(response.data.main.temp_min);
  lowTemperatureElement.innerHTML = `<strong> Low</strong>: ${lowTemperature}˚C`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `<strong>Humidity</strong>: ${humidity}%`;

  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `<strong>Wind Speed</strong>: ${wind} m/s`;

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let cityName = document.querySelector("#location-input").value;
  searchCity(cityName);
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
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Upland");

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
              <div class="col-2">
                <div class="date-forecast">${day}</div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
                  alt=""
                  class="forecast-weather-icon"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-max">19˚</span>
                  <span class="weather-forecast-min">12˚</span>
                </div>
              </div>    
            `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}
