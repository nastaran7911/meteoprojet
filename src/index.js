function refreshweather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="weather-app-icon"/>`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  temperatureElement.innerHTML = Math.round(temperature);
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  getForcast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "179d18a7b4e4aebt8ff9c850b9e3060o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshweather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForcast(city) {
  let apiKey = "179d18a7b4e4aebt8ff9c850b9e3060o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  console.log(response.data);
  let forcastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forcastHTML =
        forcastHTML +
        `
  <div class="weather-forcast-day">
    <div class="weather-forcast-date">${formatDay(day.time)}</div>
    <div class="weather-forcast-icon">
    <img src="${day.condition.icon_url}"/>
    </div>
    <div class="weather-forcast-temperatures">
      <div class="weather-forcast-temperature">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="weather-forcast-temperature">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>
`;
    }
  });

  let forcastElement = document.querySelector("#forcast");
  forcastElement.innerHTML = forcastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
