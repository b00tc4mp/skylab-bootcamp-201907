const { validate, call } = require('../../utils')

module.exports = function (id, token) {
    validate.string(id, 'userId')
    validate.string(token, 'token')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            return response.data
        })
}