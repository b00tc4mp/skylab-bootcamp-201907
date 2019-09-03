const { validate, call } = require('../../utils')

module.exports = function (id, token) {
    validate.multiple([
        { type: 'string', name: 'id' , target: id },
        { type: 'string', name: 'token' , target: token }
    ])

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            if (!favorites.length) return []

            const calls = favorites.map(id =>
                call(`http://duckling-api.herokuapp.com/api/ducks/${id}`, undefined, undefined, undefined)
                    .then(duck => (duck.favorite = true) && duck)
            )

            return Promise.all(calls)
        })
}