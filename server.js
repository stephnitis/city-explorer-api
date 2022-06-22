'use strict';

require('dotenv').config();
// const response  = require('express');
const express = require('express');
const cors = require('cors');
const app = express();
const weatherData = require('./data/weather.json');
app.use(cors());

const PORT = process.env.PORT || 3002;

console.log(weatherData);

class Forecast {
  constructor(weatherObject){
    this.datetime = weatherObject.datetime;
    this.description = weatherObject.weather.description;
  }
}

app.get('/weatherData', (request, response) => {
  const searchQuery = request.query.searchQuery;
  // const lat = request.query.lat;
  // const lon = request.query.lon;
  console.log(searchQuery);
  let searchResult = weatherData.find(object => object.city_name.toLowerCase() === searchQuery.toLowerCase());

  const result = searchResult.data.map(dayObj => new Forecast(dayObj));
  // const result = new Forecast(searchResult);
  console.log(result);
  response.status(200).send(result);
});

// app.get('/hello', (request, response) => {
//   console.log(request.query.name);
//   let name = request.query.name
//   response.send('hello!');
// });

app.get('*', (request, response) => {
  response.status(404).send('Does Not Compute : Not Found');
});

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));