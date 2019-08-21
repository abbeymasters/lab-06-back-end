const request = require('superagent');

const BASE_URL = 'https://www.eventbriteapi.com/v3';
const EVENTBRITE_API_KEY = process.env.EVENTBRITE_API_KEY;

module.exports = {
    getEvents(lat, lng) {
        const url = `${BASE_URL}/events/serach?locationlongitude=${lng}&location.latitude=${lat}&expand=venue   -H 'Authorization: Bearer PERSONAL_OAUTH_TOKEN'`; 

        return request
            .get(url)
            .then(res => {
                return listEvents(res.body);
            });
    }
};

function listEvents(response) {
    const data = response.data;

    return data.map(formatEvents);
}


function formatEvents(event) {
    return {
        link: ,
        name: ,
        event_date: ,
        summary: ,
    };
}