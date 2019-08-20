logic.authenticateUser = function(username, password) {
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
    validate.function(expression, 'expression')

    return call('https://skylabcoders.herokuapp.com/api/auth', 'post',
        { 'content-type': 'application/json' },
        { username, password })
        .then(response => {
            if(response.status === 'KO') expression (new Error(response.error))
        })
}