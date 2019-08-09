/**
 * Register new users to Herokuapp's API via form.
 * If the user is already registered API returns a error message.
 * If the register goes well, API returns a 'KO' status and an error message.
 * 
 * @param {String} url api's endpoint url.
 * @param {String} method method can be 'get', 'post', 'put', 'patch' or 'delete'.
 * @param {String} headers User's email.
 * @param {String} body Body in JSON format.
 * 
 * 
 * @return {Object} Response status, data, body.
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


 


