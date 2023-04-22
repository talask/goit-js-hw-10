import './css/styles.css';

const DEBOUNCE_DELAY = 300;


import fetchCountries from './js/fetchCountries';
import Notiflix from 'notiflix';
let  debounce  = require('lodash.debounce'); 

const inputSearch = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const div = document.querySelector('.country-info');
 console.log("script");
inputSearch.addEventListener('input', debounce(() => {
  console.log("listener");
  const value = trim(inputSearch);
  if(value.length) {
  return fetchCountries(value)
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