'use strict';

const axios = require('axios');

async function getMovies(req, res, next){
  console.log('hey from hollywood')
  try{
  
   let cityInput = req.query.searchQuery;
  
   let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityInput}`;
  
   let movieResults = await axios.get(url);
   console.log(movieResults);
  
   let movieObject = movieResults.data.results.map(film => new Movie(film));
   res.status(200).send(movieObject);
   console.log(movieObject);
  } catch (error) {
   next(error);
   console.log(error.message);
  }
};

class Movie {
  constructor(film) {
    this.title = film.original_title;
    this.overview = film.overview;
    //https://image.tmdb.org/t/p/w300/poster_path
    // this.src = film.poster_path ? film.poster_path : 'myImg.jpg'
  }
}

module.exports = getMovies;