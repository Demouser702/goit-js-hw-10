console.log('functioneaza');
import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
axios.defaults.headers.common['x-api-key'] =
  'live_LdfqGvSEWRIM1c2puv3QUFyTjYi5rWEM2QhddQ8nHKFGtnUTjR9YAzb2qCampoZA';
const url = 'https://api.thecatapi.com/v1/breeds';
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId);
  // createMarkup(selectedBreedId);
});

fetchBreeds();
