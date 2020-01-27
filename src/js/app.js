let defaultQuery = "batman";

getMovies(defaultQuery);

$(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function imgError(image) {
  image.onerror = "";
  image.src = "./imgs/not-found.jpg";
  image.style.height = "350px";
  return true;
}

function getMovies(searchText) {
  //   console.log(searchText);
  axios
    .get("https://omdbapi.com/?apikey=1e93644a&s=" + searchText)
    .then(res => {
      //   console.log(res);
      let movies = res.data.Search; // array
      let output = "";
      $.each(movies, (i, el) => {
        output += `
            <div class="card-container col-xl-3 col-md-4 col-6">
                <div class="card text-center">
                    <img class="card-img-top" src="${el.Poster}" onclick="movieSelected('${el.imdbID}')" onerror="imgError(this);"></img>
                    <div class="card-body">
                        <h5>${el.Title}</h5>
                        <a onclick="movieSelected('${el.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            </div>`;
      });
      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id); // id passed in w/ onclick
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  axios
    .get("https://omdbapi.com/?apikey=1e93644a&i=" + movieId)
    .then(res => {
      console.log(res);
      let movie = res.data;
      let output = `
        <div class= "flex-row">
            <div class= "img-container">
                <img src="${movie.Poster}" class="thumbnail" onerror="imgError(this);"></img>
            </div>
            <div class= "details-container">
                <h5>${movie.Title}</h5>
                <ul class="movie-details">
                    <li class="list-group-item"><span>Released: </span>${movie.Year}</li>
                    <li class="list-group-item"><span>Genre: </span>${movie.Genre}</li>
                    <li class="list-group-item"><span>Rating: </span>${movie.Rated}</li>
                    <li class="list-group-item"><span>IMDB Score: </span>${movie.imdbRating}</li>
                    <li class="list-group-item"><span>Runtime: </span>${movie.Runtime}</li>
                    <li class="list-group-item"><span>Actors: </span>${movie.Actors}</li>
                    <li class="list-group-item"><span>Writers: </span>${movie.Writer}</li>
                    <li class="list-group-item"><span>Director: </span>${movie.Director}</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h4>Plot</h4>
                    <p>${movie.Plot}</p>
                    <hr>
                    <a href="https://imdb.com/title/${movie.imdbID}" class="btn btn-primary">View on IMDB</a>
                    <a href="index.html" class="btn btn-secondary">Back to Search</a>
                </div>
            </div>
        </div>`;
      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
