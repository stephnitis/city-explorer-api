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
    this.description = weatherObject.description;
  }
}

app.get('/weatherData', (request, response) => {
  const searchQuery = request.query;
  console.log(searchQuery);
  let searchResult = weatherData.find(object => object.city_name === searchQuery);
 

  const result = new Forecast(searchResult);
  console.log(result);
})

// app.get('/hello', (request, response) => {
//   console.log(request.query.name);
//   let name = request.query.name
//   response.send('hello!');
// });

app.get('*', (request, response) => {
  response.send('Does Not Compute');
});

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));