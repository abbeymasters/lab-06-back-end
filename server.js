require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const mapsApi = require('./lib/maps-api.js');
const weatherApi = require('./lib/weather-api.js'); 
const eventbriteApi = require('./lib/eventbrite-api.js');
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(cors());


app.get('/location', (request, response) => {
    const search = request.query.search;
    mapsApi.getLocation(search)
        .then(location => {
            response.json(location);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });
});


app.get('/weather', (request, response) => {
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;

    weatherApi.getForecast(latitude, longitude)
        .then(forecast => {
            response.json(forecast);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });
});

app.get('/events', (request, response) => {
    const latitude = request.query.latitude;
    const longitude = request.query.longitude;

    eventbriteApi.listEvents(latitude, longitude)
        .then(events => {
            response.json(events);
        })
        .catch(err => {
            response.status(500).json({
                error: err.message || err
            });
        });
});

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});