import './style.css';

const url = {
  base: 'https://api.openweathermap.org/data/2.5/',
};

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
      break;
    case 'Drizzle':
      document.body.style.backgroundImage = 'url("drizzle.jpg")';
      break;
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

  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  function dateBuilder(d) {
    const months = [
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
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  const temperature = Math.round(weather.main.temp)

  const icon = document.getElementById('image');
  icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerText = weather.weather[0].main;

  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max,
  )}°c`;

  const current = document.querySelector('.current')
  const tempSpan = document.querySelector("span")
  current.addEventListener('click', () => {
    if (tempSpan.textContent === '°f') {
      tempSpan.textContent = '°c'
      temp.innerHTML = `${Math.round(temperature)}<span>°c</span>`;
    } else {
      tempSpan.textContent = '°f';
      temp.innerHTML = `${(Math.round((temperature - 32) * 5 / 9))}<span>°f</span>`;
    }
  })
}

function getResults(query) {
  fetch(`${url.base}weather?q=${query}&units=metric&APPID=${process.env.API}`)
    .then((weather) => { weather.json().then(displayResults); });
}

const searchbox = document.querySelector('.search-box');

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
  }
}

searchbox.addEventListener('keypress', setQuery);
