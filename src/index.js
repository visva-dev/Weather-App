import './style.css';

const url = {
  base: 'https://api.openweathermap.org/data/2.5/',
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${url.base}weather?q=${query}&units=metric&APPID=${process.env.API}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  switch (weather.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url("clear.jpg")';
      break;
    case 'Clouds':
      document.body.style.backgroundImage = 'url("cloudy.jpg")';
      break;
    case 'Rain':
      document.body.style.backgroundImage = 'url("rain.jpg")';
    case 'Drizzle':
      document.body.style.backgroundImage = 'url("drizzle.jpg")';
    case 'Mist':
      document.body.style.backgroundImage = 'url("mist.jpg")';
      break;
    case 'Thunderstorm':
      document.body.style.backgroundImage = 'url("thunderstorm.jpg")';
      break;
    case 'Snow':
      document.body.style.backgroundImage = 'url("snow.jpg")';
      break;
    default:
      break;
  }

  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let icon = document.getElementById('image');
  icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

function dateBuilder(d) {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
