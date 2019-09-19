import logic from '../index'
import call from '../../utils/call/index'
import validate from '../../utils/validate/index'

const retrieveUser = function (id, token) {
    validate.string(id, 'id')
    validate.string(token, 'token')

    return call(`http://localhost:8080/api/users/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === '400') throw new Error(response.error)

            return response
        })
}

export default retrieveUser