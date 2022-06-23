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
  console.log('hello');
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let url = `https://api.weatherbit.io/v2.0/normals?lat=${lat}&lon=${lon}&start_day=02-02&end_day=03-01&tp=daily&key=${process.env.WEATHER_API_KEY}`;
    let results = await axios.get(url);
    let weatherObject = results.data.data.map(day => new Forecast(day));
    res.status(200).send(weatherObject);
    console.log(results);
  } catch (error) {
    next(error)
  }

});

class Forecast {
  constructor(weatherObject){
    this.lat = weatherObject.lat;
    this.lon = weatherObject.lon;
    // this.datetime = weatherObject.datetime;
    // this.description = weatherObject.weather.description;
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