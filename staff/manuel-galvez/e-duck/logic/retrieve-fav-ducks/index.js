logic.retrieveFavDucks = function(id, token) {
    validate.string(id, 'id')
    validate.string(token, 'token')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
        { 'authorization': `bearer ${token}` },
        undefined)
        .then(response =>  {
            if (response.status === 'KO') throw Error(response.error)
            else {
                const favorites = response.data.favorites
                if (!favorites.length) return []
                else {
                   const promises = favorites.map(id =>
                        call('http://duckling-api.herokuapp.com/api/ducks/' + id, undefined, undefined, undefined)
                        .then(duck => (duck.favorite = true) && duck)
                    )
                    return Promise.all(promises)
                }
            }
        })
        .catch(error => error)
    }
