import './style.css';

window.addEventListener('load', () => {
  let lon;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-dsc');
  let degree = document.querySelector('.degree');
  let temperature = document.querySelector('.temperature-section');
  let temperatureSpan = document.querySelector('.temperature-section span');
  let timeZone = document.querySelector('.location-timezone');
  let locationName = document.querySelector('.location-name');
  let icon = document.getElementById('image');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          let celsius = (temp * 32) / (5 + 32);
          degree.textContent = temp;
          temperatureDescription.textContent = data.weather[0].description;
          timeZone.textContent = data.sys.country;
          locationName.textContent = data.name;
          icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
          temperature.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              degree.textContent = Math.floor(celsius - 236);
            } else {
              temperatureSpan.textContent = 'F';
              degree.textContent = temp;
            }
          });
        });
    });
  } else {
    h1.textContent = 'Please anable location sharing to see a temperature.';
  }
});
