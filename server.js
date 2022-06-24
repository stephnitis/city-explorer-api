'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const axios = require('axios');
// const weatherData = require('./data/weather.json');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/weather', async (req, res, next) => {

  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
    let results = await axios.get(url);
    let weatherObject = results.data.data.map(day => new Forecast(day));
    res.status(200).send(weatherObject);
    } catch (error) {
    next(error)
  }

});

class Forecast {
  constructor(day){
    this.datetime = day.datetime;
    this.description = day.weather.description;
  }
}

app.get('/movies', async (req, res, next) => {
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
  next(error)
 }
});

class Movie {
  constructor(film) {
    this.title = film.original_title;
    this.overview = film.overview;
  }
}

// app.get('/weatherData', (request, response) => {
//   const searchQuery = request.query.searchQuery;
//   // const lat = request.query.lat;
//   // const lon = request.query.lon;
//   console.log(searchQuery);
//   let searchResult = weatherData.find(object => object.city_name.toLowerCase() === searchQuery.toLowerCase());

//   const result = searchResult.data.map(dayObj => new Forecast(dayObj));
//   // const result = new Forecast(searchResult);
//   console.log(result);
//   response.status(200).send(result);
// });

app.get('*', (request, response) => {
  response.status(404).send('Does Not Compute : Not Found');
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));