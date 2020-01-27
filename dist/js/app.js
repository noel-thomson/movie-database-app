"use strict";

var defaultQuery = "batman";
getMovies(defaultQuery);
$(function () {
  $("#searchForm").on("submit", function (e) {
    var searchText = $("#searchText").val();
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
  axios.get("https://omdbapi.com/?apikey=1e93644a&s=" + searchText).then(function (res) {
    //   console.log(res);
    var movies = res.data.Search; // array

    var output = "";
    $.each(movies, function (i, el) {
      output += "\n            <div class=\"card-container col-xl-3 col-md-4 col-6\">\n                <div class=\"card text-center\">\n                    <img class=\"card-img-top\" src=\"".concat(el.Poster, "\" onclick=\"movieSelected('").concat(el.imdbID, "')\" onerror=\"imgError(this);\"></img>\n                    <div class=\"card-body\">\n                        <h5>").concat(el.Title, "</h5>\n                        <a onclick=\"movieSelected('").concat(el.imdbID, "')\" class=\"btn btn-primary\" href=\"#\">Movie Details</a>\n                    </div>\n                </div>\n            </div>");
    });
    $("#movies").html(output);
  })["catch"](function (err) {
    console.log(err);
  });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id); // id passed in w/ onclick

  window.location = "movie.html";
  return false;
}

function getMovie() {
  var movieId = sessionStorage.getItem("movieId");
  axios.get("https://omdbapi.com/?apikey=1e93644a&i=" + movieId).then(function (res) {
    console.log(res);
    var movie = res.data;
    var output = "\n        <div class= \"flex-row\">\n            <div class= \"img-container\">\n                <img src=\"".concat(movie.Poster, "\" class=\"thumbnail\" onerror=\"imgError(this);\"></img>\n            </div>\n            <div class= \"details-container\">\n                <h5>").concat(movie.Title, "</h5>\n                <ul class=\"movie-details\">\n                    <li class=\"list-group-item\"><span>Released: </span>").concat(movie.Year, "</li>\n                    <li class=\"list-group-item\"><span>Genre: </span>").concat(movie.Genre, "</li>\n                    <li class=\"list-group-item\"><span>Rating: </span>").concat(movie.Rated, "</li>\n                    <li class=\"list-group-item\"><span>IMDB Score: </span>").concat(movie.imdbRating, "</li>\n                    <li class=\"list-group-item\"><span>Runtime: </span>").concat(movie.Runtime, "</li>\n                    <li class=\"list-group-item\"><span>Actors: </span>").concat(movie.Actors, "</li>\n                    <li class=\"list-group-item\"><span>Writers: </span>").concat(movie.Writer, "</li>\n                    <li class=\"list-group-item\"><span>Director: </span>").concat(movie.Director, "</li>\n                </ul>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"card\">\n                <div class=\"card-body\">\n                    <h4>Plot</h4>\n                    <p>").concat(movie.Plot, "</p>\n                    <hr>\n                    <a href=\"https://imdb.com/title/").concat(movie.imdbID, "\" class=\"btn btn-primary\">View on IMDB</a>\n                    <a href=\"index.html\" class=\"btn btn-secondary\">Back to Search</a>\n                </div>\n            </div>\n        </div>");
    $("#movie").html(output);
  })["catch"](function (err) {
    console.log(err);
  });
}