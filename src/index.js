import './main.css';
import ApiService from './fetchCountries';
const countryApiService = new ApiService();
const debounce = require('lodash.debounce');
import counteryCardTpl from './templates/main.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const refs = {
  inputSearch: document.querySelector('.input-search'),
  countryContainer: document.querySelector('.container'),
};

refs.inputSearch.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  const searchQuery = refs.inputSearch.elements.query.value;

  countryApiService
    .fetchCountries(searchQuery)
    .then(countryMarkup)
    .catch(alert('Notice me, senpai!'));
}

function countryMarkup(countries) {
  refs.countryContainer.insertAdjacentHTML(
    'beforeend',
    counteryCardTpl(countries),
  );
}

PNotify.error({
  title: 'Oh No!',
  text: 'Something terrible happened.',
});
