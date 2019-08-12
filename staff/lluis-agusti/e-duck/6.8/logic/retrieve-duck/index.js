logic.retrieveDuck = function (id, token, duckId) {
    let favorites

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(duckId, 'duck id')

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`http://duckling-api.herokuapp.com/api/ducks/${duckId}`, 'get', undefined, undefined)
                    .then(duck => {
                        if (duck.error) throw new Error(duck.error)

                        favorites && (duck.favorite = favorites.includes(duckId))

                        return duck
                    })
            })
    } else {
        validate.string(duckId, 'duck id')

        return call(`http://duckling-api.herokuapp.com/api/ducks/${duckId}`, undefined, undefined, undefined)
            .then(duck => {
                if (duck.error) throw new Error(duck.error)

                return duck
            })
    }
}