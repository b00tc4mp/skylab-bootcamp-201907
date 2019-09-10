const { validate, call } = require('../../utils')

module.exports = function (id, token) {
    validate.multiple([
        { type: 'string', name: 'id' , target: id },
        { type: 'string', name: 'token' , target: token }
    ])


    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            return response.data
        })
}