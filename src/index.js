console.log('functioneaza');
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_LdfqGvSEWRIM1c2puv3QUFyTjYi5rWEM2QhddQ8nHKFGtnUTjR9YAzb2qCampoZA';
const url = 'https://api.thecatapi.com/v1/breeds';
const breedSelect = document.querySelector('.breed-select');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId);
});

fetchBreeds();
