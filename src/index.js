import './css/styles.css';

const DEBOUNCE_DELAY = 300;


import {fetchCountries} from './js/fetchCountries';
import Notiflix from 'notiflix';
let  debounce  = require('lodash.debounce'); 

const inputSearch = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const div = document.querySelector('.country-info');
 
inputSearch.addEventListener('input', debounce(() => {
 
  const value = inputSearch.value.trim();
  if(value.length) {

  return fetchCountries(value)
    .then(data => {
    
      div.innerHTML = '';
      list.innerHTML = '';
     
      if(data.length === 1){
       
        div.innerHTML = createFindCard(data[0]);

      }else if(data.length <= 10) {
        
        list.insertAdjacentHTML("beforeend", createFindList(data));

      } else {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
    })
    .catch(error => {
    
      div.innerHTML = '';
      list.innerHTML = '';
      
      if(error.message === "404") {
        
        Notiflix.Notify.failure('Oops, there is no country with that name');

      }else {

        console.log(error);

      }
  });
}
}, DEBOUNCE_DELAY));

function createFindList(arr) {
 
  return arr.map(({name: { official } ,flags: { svg, alt }}) => {
    return `
    <li>
      <img src='${svg}' alt='${alt}' width='24'>
      ${official}
    </li>
    `}).join('');

}

function createFindCard({name: { official }, flags: { svg, alt }, capital,population, languages}) {
 
  return `
    <h2><img src='${svg}' alt='${alt}' width='34'>
    ${official}</h2>
    <p><span>Capital:</span> ${[...capital]}</p>
    <p><span>Languages:</span> ${Object.values(languages).join(', ')}</p>
    <p><span>Population:</span> ${population}</p>
  `
}