export default class CountryApiService {
  constructor() {}

  fetchCountries(searchQuery) {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    return fetch(url).then(newError);
  }
}

function newError(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Error fetching data');
}
