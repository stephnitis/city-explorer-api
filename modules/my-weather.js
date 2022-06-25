'use strict';

const axios = require('axios');

let cache = {
  weatherCache: []
};

async function getWeather (req, res, next){
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;

    let key = lat + lon + 'Cache';

    if (cache[key]) {
      res.status(200).send(cache[key].data);
    } else {        
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&units=I&days=5&lat=${lat}&lon=${lon}`;
    let results = await axios.get(url);
    let weatherObject = results.data.data.map(day => new Forecast(day));

    
    cache[key] = weatherObject;
    res.status(200).send(weatherObject);
    console.log('Cache Money Bitz')
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