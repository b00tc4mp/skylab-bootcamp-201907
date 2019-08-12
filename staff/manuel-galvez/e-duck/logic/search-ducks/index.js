logic.searchDucks = function(id, token, query) {
    let favorites

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(query, 'query', false)


       return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { "authorization": `bearer ${token}` }, undefined) 
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)
                else {
                    favorites = response.data.favorites
                    return call('http://duckling-api.herokuapp.com/api/search?q=' + query, 'get', undefined, undefined)
                }
            })
            .then(response => { 
                if (response.error) throw new Error(response.error)
                else if (favorites) {
                    ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))
                    return ducks
                }
            })
            .catch(error => new Error(`Fail search with criteria ${query}`))

    } else {
        validate.string(query, 'query', false)

        return call('http://duckling-api.herokuapp.com/api/search?q=' + query, 'get', undefined, undefined)
            .then(ducks => {
                    if (ducks.error) return []
                    else return ducks 
            })
            .catch(error => error)
        }
}
