function call(url, method = 'get', headers, body) {
    // validate.string(url, 'url')
    // validate.url(url, 'url')
    validate.string(method, 'method', true, ['get', 'post', 'put', 'patch', 'delete'])

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    })
        .then(res => {
            console.log('res on call before :', res);
            if (res.status !== 200 || res.status !== 201 ) {
                throw new Error(res)
            }
            return res.json()
        })
}