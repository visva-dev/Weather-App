import './style.css';

window.addEventListener('load', () => {
  let lon;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-dsc');
  let temperatureDegree = document.querySelector('.degree');
  let temperatureTimeZone = document.querySelector('.location-timezone');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://';
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = data.weather[0].description;
          temperatureTimeZone.textContent = data.sys.country;
        });
    });
  } else {
    h1.textContent = 'Please anable location sharing to see a temperature.';
  }
});
