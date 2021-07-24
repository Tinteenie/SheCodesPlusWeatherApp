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
todaysDate.innerHTML = `<strong>Today</strong>: ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

let todaysTime = document.querySelector("#current-time");
todaysTime.innerHTML = `<strong>Time</strong>: ${currentHour}: ${currentMinute}: ${currentSecond}`;

function displayWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}`;

  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  descriptionElement.innerHTML = `<strong>${description}</strong>`;

  let feelsLikeElement = document.querySelector("#feels-like-temperature");
  let feelsLikeTemperature = Math.round(response.data.main.feels_like);
  feelsLikeElement.innerHTML = `<strong> Feels Like</strong>: ${feelsLikeTemperature}˚F`;

  let highTemperatureElement = document.querySelector("#high-temperature");
  let highTemperature = Math.round(response.data.main.temp_max);
  highTemperatureElement.innerHTML = `<strong>Today's High</strong>:${highTemperature}˚F`;

  let lowTemperatureElement = document.querySelector("#low-temperature");
  let lowTemperature = Math.round(response.data.main.temp_min);
  lowTemperatureElement.innerHTML = `<strong> Today's Low</strong>: ${lowTemperature}˚F`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `<strong>Humidity</strong>: ${humidity}%`;

  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `<strong>Wind Speed</strong>: ${wind}mph`;
}

function searchCity(cityName) {
  let apiKey = "846acd27931c9d626c32650564c67fcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
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

searchCity("Upland");

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "<strong>40</strong>";
}
let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "<strong>104</strong>";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
