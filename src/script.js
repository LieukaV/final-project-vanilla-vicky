function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
let descriptionElement = document.querySelector("#current-date");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind-speed");
let timeElement = document.querySelector("#time");
let date = new Date(response.data.time * 1000);

let iconElement = document.querySelector("#icon")



iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = temperature;

    receiveForecast(response.data.city);
  }


  function formatDate(date) {
    
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday","Monday","Tuesday","Wednesdsay","Thursday","Friday","Saturday"]

    let day = days[date.getDay()];

    if (minutes < 10) {
      minutes = `0${minutes}`
    }

    return `${day} ${hours}:${minutes} `;
  }
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
  
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }


  
  function forecastDisplay(response) {





    let forecastElement = document.querySelector("#forecast");

    
    let forecastHtml = "";

    response.data.daily.days.forEach(function(day , index){
if (index < 5) {

      forecastHtml = forecastHtml +
       `
      <div class="forecast-day-weather">
                     <div class="forecast-date-weather">${formateDay(day.time)}</div>
                     <img src="${day.condition.icon_url}"   class="forecast-icon-weather"/> 
                     <div class="forecast-temperatures-weather">
                       <div class="temperature-forecast-class"><strong >${Math.round(day.temperature.maximum)}°</strong></div>
                       <div class="temperature-forecast-class">${Math.round(day.temperature.minimum)}°</div>
                   </div>
                   </div>`;
}
    });
      forecastElement.innerHTML = forecastHtml;
  
  }

  function formateDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    return days[date.getDay()];
  }



 function receiveForecast(city) {
  let apiKey = "79a2etb100ec8d0o4359f0b1e87486a0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(forecastDisplay);
  console.log(apiUrl);
 }

 
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
 
  
 
