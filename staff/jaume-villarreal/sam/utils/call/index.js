module.exports = function(url , method = 'get' , headers , body){
    
    validate.str(url , 'string')
    validate.url(url , 'url')
    validate.str(method , 'method' , true , ['get' , 'post' , 'put' , 'patch' , 'delete'])

    return fetch(url , {
        method,
        headers,
        body: JSON.stringify(body)
    })
        .then(response => response.json())
}