logic.toggleFavDuck = function(id, token, duckId) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.string(duckId, 'duck id')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
        { 'authorization': `bearer ${token}` },
        undefined)
        .catch(error => error)
        .then(response => {
            if (response.status === 'KO') throw Error(response.error)
            else {
                const favorites = response.data.favorites
                const index = favorites.findIndex(favorite => favorite === duckId)

                if (index > -1) {
                    favorites.splice(index, 1)

                    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put',
                        { 'content-type': 'application/json', 'authorization': `bearer ${token}` },
                        { favorites })

                        .catch(error => error)
                        .then(response => {
                            if (response.status === 'KO') throw Error(response.error)
                            return response.data
                        })
                } else {
                    return call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, undefined, undefined, undefined)
                        .catch(error => error)
                        .then(duck => {
                            if (duck.error) throw Error(duck.error)
                            else {
                                favorites.push(duckId)
                                debugger
                                return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put',
                                { 'content-type': 'application/json', 'authorization': `bearer ${token}` },
                                { favorites })
                                }
                            })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)
                })
            }
        }
    })
}