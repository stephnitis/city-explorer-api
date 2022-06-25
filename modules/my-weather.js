'use strict';

const axios = require('axios');

let cache = {};

async function getWeather (req, res, next){
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;

    let key = lat + lon + 'Cache';
    let timeCache = 1000 * 60 * 60;

    if (cache[key] && Date.now() - cache[key].timestamp < timeCache) {
      console.log('Cache Money Bitz')
      res.status(200).send(cache[key].data);
    } else {
      console.log ('cache me outside');
    
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
    let results = await axios.get(url);
    let weatherObject = results.data.data.map(day => new Forecast(day));    
    
    cache[key] = {
    data : weatherObject,
    timestamp: Date.now()
  }
    res.status(200).send(weatherObject);
    
    } 
    } catch (error) {
    next(error)
    }
  
};

  class Forecast {
    constructor(day){
      this.datetime = day.datetime;
      this.description = day.weather.description;
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

module.exports = getWeather;