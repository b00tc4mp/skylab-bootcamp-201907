const { validate, call } = require('../../utils')

function registerUser(name, surname, username, password, repassword) {
     validate.multiple([
        { type: 'string', name: 'name' , target: name },
        { type: 'string', name: 'surname' , target: surname },
        { type: 'string', name: 'username' , target: username },
        { type: 'email', name: 'username' , target: username },
        { type: 'string', name: 'password' , target: password },
        { type: 'string', name: 'password repeat' , target: repassword }
    ])

    if (password !== repassword) throw new Error('passwords do not match')

    return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, { name, surname, username, password, favorites: [] })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
        })
}

module.exports = registerUser
