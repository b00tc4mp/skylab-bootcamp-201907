const { validate, call } = require('../../utils')

module.exports = function (id, token, duckId) {
    validate.multiple([
        { type: 'string', name: 'id' , target: id },
        { type: 'string', name: 'token', target: token },
        { type: 'string', name: 'duck id', target: duckId, empty: false }
    ])

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            const index = favorites.findIndex(favorite => favorite === duckId)

            if (index > -1) {
                favorites.splice(index, 1)

                return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                    })
            } else
                return call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, undefined, undefined, undefined)
                    .then(duck => {
                        if (duck.error) throw new Error(duck.error)

                        favorites.push(duckId)

                        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', { 'content-type': 'application/json', 'authorization': `bearer ${token}` }, { favorites })
                            .then(response => {
                                if (response.status === 'KO') expression(new Error(response.error))
                            })
                    })
        })
}