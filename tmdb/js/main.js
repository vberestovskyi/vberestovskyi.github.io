//Page elements
const topRatedButton = document.querySelector('#topRatedButton');
const popularButton = document.querySelector('#popularButton');

$(document).ready(() => {
  getPopular();
  if (topRatedButton) { topRatedButton.addEventListener('click', getTopRated)};
  if (topRatedButton) { popularButton.addEventListener('click', getPopular)};
    

  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});




const APIKEY = "9178abd80bd8902e8911757d54619468";
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;

// SHOW DESCRIPTION
function getMovies(searchText) {
  let url = ''.concat(baseURL, 'search/tv?api_key=', APIKEY, '&query=', searchText);
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      //console.log(response.results);
      let movies = response.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.original_name}</h5>
              <a onclick="showSelected('${movie.id}')" class="btn btn-primary" href="#">Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Show serial on a new page
function showSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'show.html';
  return false;
}

//Show Season 
function seasonSelected(seasonNumber) {
  sessionStorage.setItem('seasonNumber', seasonNumber);
  getSeason()
}

//Show Episode
function episodeSelected(episodeNumber) {
  sessionStorage.setItem('episodeNumber', episodeNumber);
  getEpisode()
}


//Display SHOW details
function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  let url = ''.concat(baseURL, 'tv/', movieId, '?api_key=', APIKEY);
  fetch(url)
    .then((result) => {
      return result.json();
    })

    .then((movie) => {
      //console.log(movie);
      // list of seasons
      let seasons = '';
      $.each(movie.seasons, (index, movie) => {
        seasons += `
            <div class="well text-center">
              <h5>${movie.name}</h5>
              <a onclick="seasonSelected('${movie.season_number}')" class="btn btn-primary" href="#">Details</a>
            </div>
        `;
      });
      // Content of a page with a chosen serial
      let output = `
        <div class="row">
          <div class="col-md-4">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.name}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Overview:</strong> ${movie.overview}</li>
              <li class="list-group-item"><strong>Number of seasons:</strong> ${movie.number_of_seasons}</li>
              <li class="list-group-item"><strong>Number of episodes:</strong> ${movie.number_of_episodes}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            ${seasons}
            <hr>
            <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Display SEASON details
function getSeason() {
  let movieId = sessionStorage.getItem('movieId');
  let seasonNumber = sessionStorage.getItem('seasonNumber');

  let url = ''.concat(baseURL, 'tv/', movieId, '/season/', seasonNumber, '?api_key=', APIKEY);
  fetch(url)
    .then((result) => {
      return result.json();
    })

    .then((movie) => {
      //console.log(movie);
      // list of episodes
      let episodes = '';
      $.each(movie.episodes, (index, movie) => {

        episodes += `
          <div class="col-md-3">
            <div class="well text-center">

              <h5>${movie.name}</h5>
              <a onclick="episodeSelected('${movie.episode_number}')" class="btn btn-primary" href="#">Details</a>
            </div>
          </div>
        `;
      });

      //Season content
      let output = `
        <div class="row">
          <div class="col-md-4">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.name}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Overview:</strong> ${movie.overview}</li>
              <li class="list-group-item"><strong>Season number:</strong> ${movie.season_number}</li>
              <li class="list-group-item"><strong>Number of episodes:</strong> ${movie.episodes.length}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            ${episodes}
            <hr>
            <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Display EPISODE details
function getEpisode() {
  let movieId = sessionStorage.getItem('movieId');
  let seasonNumber = sessionStorage.getItem('seasonNumber');
  let episodeNumber = sessionStorage.getItem('episodeNumber');



  let url = ''.concat(baseURL, 'tv/', movieId, '/season/', seasonNumber, '/episode/', episodeNumber, '?api_key=', APIKEY);
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((movie) => {
      //console.log(movie);

      //Episode content
      let output = `
        <div class="row">
          <div class="col-md-4">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.name}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Overview:</strong> ${movie.overview}</li>
              <li class="list-group-item"><strong>Season number:</strong> ${movie.season_number}</li>
              <li class="list-group-item"><strong>Episode number:</strong> ${movie.episode_number}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Show Popular TV shows
function getPopular() {
  let url = ''.concat(baseURL, 'tv/popular?api_key=', APIKEY);
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      //console.log(response.results);
      let movies = response.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.original_name}</h5>
              <a onclick="showSelected('${movie.id}')" class="btn btn-primary" href="#">Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Show Top Rated TV shows
function getTopRated() {
  let url = ''.concat(baseURL, 'tv/top_rated?api_key=', APIKEY);
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      //console.log(response.results);
      let movies = response.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.original_name}</h5>
              <a onclick="showSelected('${movie.id}')" class="btn btn-primary" href="#">Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);

    })
    .catch((err) => {
      console.log(err);
    });
}