/**
 * Sets a fetch for all required API's access previous synchronous validation
 *
 * @param {String} API url.
 * @param {String} method required ['get' as default].
 * @param {Object} headers settings [undefined admitted].
 * @param {Object} body settings [undefined admitted].
 * 
 * @throws {Error} When repassword doesn't match with password.
 * @throws {Error} When user API cannot register the user.
 * 
 * @returns {Object} A promise with requested data.
 */

function call(url, method = 'get', headers, body) {
    validate.str(url, 'string')
    validate.url(url, 'url')
    validate.str(method, 'method', true, ['get', 'post', 'put', 'patch', 'delete'])

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
}