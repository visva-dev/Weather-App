import './style.css';
import displayResults from './dom';
import dateBuilder from './date'

const url = {
  base: 'https://api.openweathermap.org/data/2.5/',
};

const date = document.querySelector('.location .date');
const now = new Date();

date.innerText = dateBuilder(now);

function getResults(query) {
  fetch(
    `${url.base}weather?q=${query}&units=metric&APPID=${process.env.API}`
  ).then((weather) => {
    weather.json().then(displayResults);
  });
}

const searchbox = document.querySelector('.search-box');

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
  }
}

searchbox.addEventListener('keypress', setQuery);
