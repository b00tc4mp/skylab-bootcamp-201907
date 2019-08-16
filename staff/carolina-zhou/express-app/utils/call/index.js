const validate = require('../validate')
const fetch = require('node-fetch')

function call(url, method = 'get', headers, body) {
    validate.string(url, 'url')
    validate.url(url, 'url')
    validate.string(method, 'method', true, ['get', 'post', 'put', 'patch', 'delete'])

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body) // The JSON.stringify() method converts a JavaScript object or value to a JSON string.
    })
        .then(res => res.json())
}

module.exports = call