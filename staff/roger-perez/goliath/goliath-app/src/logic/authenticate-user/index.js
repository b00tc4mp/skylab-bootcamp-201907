import call from '../../utils/call/index'
import validate from '../../utils/validate/index'

const authenticateUser = function (email, password) {
    validate.email(email, 'email')
    validate.string(password, 'password')

    return call('http://localhost:8080/api/auth', 'post', { 'content-type': 'application/json' }, { email, password })
        .then(response => {
            if (response.status === 'OK' ) throw new Error(response.error)
            return response
        })
}

export default authenticateUser
 