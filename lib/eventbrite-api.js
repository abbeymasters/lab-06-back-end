const request = require('superagent');

const BASE_URL = 'https://www.eventbriteapi.com/v3';
const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;

module.exports = {
    getEvents(lat, lng) {
        const url = `${BASE_URL}/events/search?token=${EVENTBRITE_API_KEY}&location.latitude=${lat}&location.longitude=${lng}`; 

        return request
            .get(url)
            .then(res => {
                return listEvents(res.body);
            });
    }
};

function listEvents(event) {

    return [{
        url: event.events[0].url,
        name: event.events[0].name.text,
        event_date: event.events[0].start.local,
        summary: event.events[0].description.html,
    }];
}