logic.authenticateUser = function(username, password, expression) {
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
    validate.function(expression, 'expression')

    call('https://skylabcoders.herokuapp.com/api/auth', 'post',
        { 'content-type': 'application/json' },
        { username, password },
        (error, response) => {
            if (error) expression(error)
            else if (response.status === 'KO') expression(new Error(response.error))
            else expression(undefined, response.data)
        }
    )
}