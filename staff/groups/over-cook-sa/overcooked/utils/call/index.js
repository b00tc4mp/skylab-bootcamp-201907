/** 
 * To be able to contact the API,\
 * send, retrieve and change information form there.
 * 
 * @param {string} url      - used to contact the APIs
 * @param {string} method   - to tell the API what we want to do
 * @param {object} headers  - http headers (argument)
 * @param {object} body     - content of the request in JSON
 * 
 */

function call(url, method = 'get', headers, body) {
    validate.string(url, 'url')
    validate.url(url, 'url')
    validate.string(method, 'method', true, ['get', 'post', 'put', 'patch', 'delete'])

    return fetch(url, {
            method,
            headers,
            body: JSON.stringify(body)
        })
        .then(res => res.json())
}