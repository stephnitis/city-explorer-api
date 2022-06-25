'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');


const getMovies = require('./modules/my-movies');
const getWeather = require('./modules/my-weather');
// const weatherData = require('./data/weather.json');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/weather', getWeather);

app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(404).send('Does Not Compute : Not Found');
});

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));