// API KEYS 
const movieListApi = "http://www.omdbapi.com/?apikey=fe7364b5&r=json&plot=full&s=";


//HTML variables
const movieContainer = document.getElementById('movieContainer');
let searchButton = document.getElementById('searchButton');
let inputField = document.getElementById('input');

//Global variables
let movieList = [];


searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  checkInput();
});

function Movies(element) {
  this.image = element.Poster;
  this.name = element.Title;
  this.year = element.Year;
  this.id = element.imdbID;
}

function checkInput() {
  let movieName = inputField.value;
  if (movieName === '') {
    movieContainer.innerHTML = '';
    showMessage(movieContainer, "Please insert a movie name!", true);
  } else {
    movieContainer.innerHTML = '';
    loadMovies(movieName);
  }
}

function showMessage(element, text, value) {
  if (value === true) {
    let message = document.createElement('p');
    message.innerText = text;
    message.classList.add("message");
    element.appendChild(message);
  }
}

function loadMovies(movieName) {
  getResource(movieListApi + movieName)
    .then(response => {
      if (response.Response === "False") {
        showMessage(movieContainer, "Your searching criteria is to general, please try something more specific!", true);
      } else {
        searchMovie(response.Search);
      }
    })
    .then(function () {
      renderMoviesBody();
    })
    .catch(function (error) {
      console.log("There was a network error", error);
    })
}


function getResource(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("An error occured while loading the page");
    })
}

function searchMovie(movie) {
  movieList = [];
  for (let items in movie) {
    if (movie !== null) {
      let movieItems = new Movies(movie[items], items);
      movieList.push(movieItems);
    }
  }
}

function renderMoviesBody() {
  for (let i = 0; i < movieList.length; i++) {
    createMovieContainer(movieList[i]);
  }
}

function createMovieContainer(movie) {
  let containerBody = document.createElement('div');
  containerBody.setAttribute('id', movie.id);
  containerBody.classList.add('container');
  movieContainer.appendChild(containerBody);

  let movieImage = document.createElement('div');
  movieImage.innerHTML = `<img src="${movie.image}" alt="Image not available">`;
  containerBody.appendChild(movieImage);

  let movieName = document.createElement('p');
  movieName.innerHTML = `Movie: <span>${movie.name}`;
  containerBody.appendChild(movieName);

  let movieYear = document.createElement('p');
  movieYear.innerHTML = `Release Year: <span>${movie.year}`;
  containerBody.appendChild(movieYear);

  let detailsButton = document.createElement('button');
  detailsButton.innerText = "Details";
  detailsButton.classList.add('detailsBtn');
  containerBody.appendChild(detailsButton);

  detailsButton.addEventListener('click', function (event) {
    event.preventDefault();
    openDetailsPage(movie.id);
  });

}

function openDetailsPage(idBtn) {
  // window.open("movie.html?id=" + idBtn);
  window.location.href ="movie.html?id=" + idBtn;
}