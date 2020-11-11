import './main.css';
import ApiService from './fetchCountries';
const countryApiService = new ApiService();
import debounce from 'lodash.debounce';
import countryCardTpl from './templates/main.hbs';
import countrySearch from './templates/search.hbs';
// Error settings
import { error, alert } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  inputSearch: document.querySelector('.input-search'),
  countryContainer: document.querySelector('.container'),
};

// Search
refs.inputSearch.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();
  refs.countryContainer.innerHTML = '';
  const searchQuery = refs.inputSearch.elements.query.value;
  if (!searchQuery) {
    return;
  }
  countryApiService
    .fetchCountries(searchQuery)
    .then(countryChanger)
    .catch(() =>
      error({
        text: 'Country is not defined!',
      }),
    );
}

//hanlebars Markup
function countryMarkup(countries) {
  refs.countryContainer.insertAdjacentHTML(
    'beforeend',
    countryCardTpl(countries),
  );
}

function countrySearchMarkup(countries) {
  refs.countryContainer.insertAdjacentHTML(
    'beforeend',
    countrySearch(countries),
  );
}

function countryChanger(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    countrySearchMarkup(countries);
  } else if (countries.length === 1) {
    countryMarkup(countries);
  } else {
    alert({
      text: 'To many matches found. Please enter a more specific query!',
    });
  }
}
