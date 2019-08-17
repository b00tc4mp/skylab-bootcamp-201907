const { validate, call } = require('../../utils')

module.exports = function (userId, token, duckId) {
    let favorites

    if (userId != undefined && token != undefined) {
        validate.string(userId, 'user id')
        validate.string(token, 'token')
        validate.string(duckId, 'duck id')

        return call(`https://skylabcoders.herokuapp.com/api/user/${userId}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
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