export function fetchCountries(name) {
  const BASE_URL = "https://restcountries.com/v3.1/name";
  const PARAM = "fields=name,flags,capital,population,languages";
 
  return fetch(`${BASE_URL}/${name}?${PARAM}`)
    .then(response => {
    
      if(!response.ok) {
      
        throw new Error(response.status);
        
      }
      return response.json();
    });
}
