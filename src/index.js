import './css/styles.css';

import fetchCountries from './js/fetchCountries.js';
import Notiflix from 'notiflix';
let  debounce  = require('lodash.debounce'); 

const DEBOUNCE_DELAY = 300;

const BASE_URL = "https://restcountries.com/v3.1/name";
const PARAM = "fields=name,flags,capital,population,languages";

const inputSearch = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const div = document.querySelector('.country-info');
 console.log("script");
inputSearch.addEventListener('input', debounce(() => {
  console.log("listener");
  const value = trim(inputSearch);
  if(value.length) {
  return fetchCountries(value)
    .then(response => {
    // Response handling
      if(!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    })
    .then(data => {
    // Data handling
      console.log(data);
    })
    .catch(error => {
    // Error handling
    Notiflix.Notify.failure('Oops, there is no country with that name');
  });
}
}, 300));