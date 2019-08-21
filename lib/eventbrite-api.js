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

function listEvents(response) {
    const data = response.events.data;
    return data.map(formatEvents);
}


function formatEvents(event) {
    return {
        url: event.url,
        name: event.name.text,
        event_date: event.start.local,
        summary: event.description.html,
    };
}