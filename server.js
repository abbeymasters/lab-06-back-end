require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;


app.get('/location', (request, response) => {
    try {
        const location = request.query.location;
        const result = getLatLng(location);
        response.status(200).json(result);
    }
    catch(err) {
        response.status(500).send('Sorry something went wrong—we suck!');
    }
});

function getLatLng() {
    return toLocation(geoData);
}

function toLocation() {
    const firstResult = geoData.results[0];
    const geometry = firstResult.geometry;

    return {
        formatted_query: firstResult.formatted_address,
        latitude: geometry.location.lat,
        longitude: geometry.location.lng
    };
}

app.get('/weather', (request, response) => {
    try {
        const weather = request.query.weather;
        const result = getWeather(weather);
        response.status(200).json(result);
    }
    catch(err) {
        response.status(500).send('Sorry something went wrong—we suck!');
    }
});

const geoData = require('./data/geo.json');

const geoWeather = require('./data/darksky.json');

function getWeather() {
    return toForecast(geoWeather);
}

function toForecast() {
    return [{
        forecast: geoWeather.daily.data[0].summary,
        time: geoWeather.daily.data[0].time
    },
    {
        forecast: geoWeather.daily.data[1].summary,
        time: geoWeather.daily.data[1].time
    },
    {
        forecast: geoWeather.daily.data[2].summary,
        time: geoWeather.daily.data[2].time
    },
    {
        forecast: geoWeather.daily.data[3].summary,
        time: geoWeather.daily.data[3].time
    },
    {
        forecast: geoWeather.daily.data[4].summary,
        time: geoWeather.daily.data[4].time
    },
    {
        forecast: geoWeather.daily.data[5].summary,
        time: geoWeather.daily.data[5].time
    },
    {
        forecast: geoWeather.daily.data[6].summary,
        time: geoWeather.daily.data[6].time
    },
    {
        forecast: geoWeather.daily.data[7].summary,
        time: geoWeather.daily.data[7].time
    }];
}

app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});