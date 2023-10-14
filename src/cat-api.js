import axios from 'axios';
const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function fetchBreeds() {
  loader.style.display = 'block';
  // breedSelect.style.display = 'none';
  error.style.display = 'none';
  catInfo.innerHTML = '';

  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      const breeds = response.data;
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      loader.style.display = 'none';
      breedSelect.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
      loader.style.display = 'none';
      error.style.display = 'block';
    });
}
fetchBreeds();

function fetchCatByBreed(breedId) {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  error.style.display = 'none';
  catInfo.innerHTML = '';

  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
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

      loader.style.display = 'none';
      breedSelect.style.display = 'block';
      catInfo.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
      loader.style.display = 'none';
      error.style.display = 'block';
    });
}
export { fetchBreeds };
export { fetchCatByBreed };
