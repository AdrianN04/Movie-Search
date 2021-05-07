// API KEYS 
const movieDetailsApi = "http://www.omdbapi.com/?apikey=fe7364b5&r=json&plot=full&i=";

//global variables
const queryString = window.location.search;
let urlParam = new URLSearchParams(queryString);
let idRecieved = urlParam.get('id');
console.log(idRecieved)
// HTML variables
const movieDetailsContainer = document.getElementById('movieDetailsContainer');
let pageTitle = document.getElementById('detailsTitle');


window.addEventListener('load', getResourcesFromPage);

//fetch API
function getResourcesFromPage() {
  fetch(movieDetailsApi + idRecieved)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
  })
  .then(responseItem => {
    displayDetails(responseItem);
  })
}

function displayDetails(item) {
  pageTitle.innerText = `Details about: ${item.Title}`

  let homeButton = document.createElement("button");
  homeButton.classList.add("homeBtn");
  homeButton.innerText = "Go back"
  homeButton.addEventListener("click", goBackToMoviePage);
  movieDetailsContainer.appendChild(homeButton);

  let itemContainer = document.createElement('div');
  itemContainer.setAttribute('class', "menuItem");
  movieDetailsContainer.appendChild(itemContainer);

  let imageContainer = document.createElement('div');
  imageContainer.innerHTML = "<img src='" + item.Poster + "'>";
  imageContainer.setAttribute('class', "img");
  movieDetailsContainer.appendChild(imageContainer);

  let actors = document.createElement('p');
  actors.innerHTML = "<span>Actors:</span> " + item.Actors;
  movieDetailsContainer.appendChild(actors);

  let genre = document.createElement('p');
  genre.innerHTML = "<span>Genre:</span> " + item.Genre;
  movieDetailsContainer.appendChild(genre);

  let rating = document.createElement('p');
  rating.innerHTML = "<span>Rating:</span> " + item.imdbRating;
  movieDetailsContainer.appendChild(rating);
  
  let released = document.createElement('p');
  released.innerHTML = "<span>Rating:</span> " + item.Released;
  movieDetailsContainer.appendChild(released);
}

function goBackToMoviePage() {
  window.location.href = "index.html";
}