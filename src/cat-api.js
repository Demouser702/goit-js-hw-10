import axios from 'axios';
import Notiflix from 'notiflix';
const loader = document.querySelector('.loader');
const loaderText = document.querySelector('.loader-text');
const breedSelect = document.querySelector('.breed-select');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

async function fetchBreeds() {
  try {
    showLoader();
    breedSelect.style.display = 'none';
    error.style.display = 'none';
    catInfo.innerHTML = '';
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    hideLoader();
    breedSelect.style.display = 'block';
  } catch (error) {
    console.error('Error fetching cat breeds:', error);
    showError();
  }
}

async function fetchCatByBreed(breedId) {
  try {
    showLoader();
    breedSelect.style.display = 'none';
    error.style.display = 'none';
    catInfo.innerHTML = '';
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const cat = response.data[0];

    const image = document.createElement('img');
    image.src = cat.url;
    image.alt = 'Cat Image';
    image.style.width = '200px';

    const catDetails = document.createElement('div');
    catDetails.innerHTML = `
        <h3>${cat.breeds[0].name}</h3>
        <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
      `;

    catInfo.appendChild(image);
    catInfo.appendChild(catDetails);

    hideLoader();
    breedSelect.style.display = 'block';
    catInfo.style.display = 'flex';
  } catch (error) {
    console.error('Error fetching cat by breed:', error);
    showError();
  }
}
function showError() {
  hideLoader();
  Notiflix.Report.failure(
    'Error',
    'Oops! Something went wrong! Try reloading the page!',
    'Reload'
  );
}
function showLoader() {
  loader.style.display = 'inline-block'; // or 'block'
  loaderText.style.display = 'inline-block';
}

function hideLoader() {
  loader.style.display = 'none';
  loaderText.style.display = 'none';
}

export { fetchBreeds };
export { fetchCatByBreed };
