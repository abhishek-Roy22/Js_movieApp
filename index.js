'use strict';

const main = document.querySelector('main');
const form = document.getElementById('search_form');
const search = document.getElementById('search');
const logo = document.querySelector('.logo');

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b536bbf197d922ff3dc91151b541affa&page=2';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=b536bbf197d922ff3dc91151b541affa&query="';

// Get initial Movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  if (data.results.length === 0) {
    main.innerHTML = '';

    const createErrorEL = document.createElement('div');
    createErrorEL.classList.add('errorHandle');
    createErrorEL.innerHTML = `<h1>Oh no 🙅🏻 ! There is no such movie exists!</h1>`;

    main.appendChild(createErrorEL);
  } else {
    showMovies(data.results);
  }
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const createEL = document.createElement('div');
    createEL.classList.add('movie');

    createEL.innerHTML = `
        <img src=${IMG_PATH + poster_path} alt="movie image" class="movie-img">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getOverviewRating(
              vote_average
            )}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3 class="overview">${overview}
            </h3>
        </div>
        `;
    main.appendChild(createEL);
  });
}

function getOverviewRating(rating) {
  if (rating >= 8) {
    return 'green';
  } else if (rating >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_URL + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});

logo.addEventListener('click', () => {
  main.innerHTML = '';
  getMovies(API_URL);
});
