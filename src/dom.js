function displayResults(weather) {
  const city = document.querySelector('.location .city');
  const temp = document.querySelector('.current .temp');
  const icon = document.getElementById('image');
  const hilow = document.querySelector('.hi-low');
  const weatherEl = document.querySelector('.current .weather');
  const current = document.querySelector('.current');
  const tempSpan = document.querySelector('span');

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

  city.innerText = `${weather.name}, ${weather.sys.country}`;

  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  const temperature = Math.round(weather.main.temp);

  icon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  weatherEl.innerText = weather.weather[0].main;

  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max,
  )}°c`;

  current.addEventListener('click', () => {
    if (tempSpan.textContent === '°f') {
      tempSpan.textContent = '°c';
      temp.innerHTML = `${Math.round(temperature)}<span>°c</span>`;
    } else {
      tempSpan.textContent = '°f';
      temp.innerHTML = `${Math.round(
        ((temperature - 32) * 5) / 9,
      )}<span>°f</span>`;
    }
  });
}

export default displayResults;
