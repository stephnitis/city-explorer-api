'use strict';

require('dotenv').config();
const { response } = require('express');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3002;

class Forecast {
  static weatherData = require('./data/weather.json');
  constructor(weatherObject){
    this.data = Forecast.weatherData[type] || [];
  }
}

app.get('/weatherData', (request, response) => {
  const type = request.query.type;
  console.log('Query Params', request.query);
  console.log('Type:', type);

  const result = new Forecast(type);
  
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