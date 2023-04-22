export function fetchCountries(name) {
  return fetch(`${BASE_URL}/${name}?${PARAM}`)
    .then(response => {
    // Response handling
      if(!response.ok) {
        throw new Error(response.status);
      }
    });
}
