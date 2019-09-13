const validate = require('../validate')

module.exports = function(url, method = 'get', headers, body) {
    validate.string(url, 'url')
    // Todo validate url
    validate.string(method, 'method', true, ['get', 'post', 'put', 'patch', 'delete'])

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    })
        .then(res => res.json())
}