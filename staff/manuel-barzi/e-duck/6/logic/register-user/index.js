logic.registerUser = function (name, surname, username, password, repassword, expression) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
    validate.string(repassword, 'password repeat')
    validate.function(expression, 'expression')

    if (password !== repassword) throw new Error('passwords do not match')

    call('https://skylabcoders.herokuapp.com/api/user', 'post',
        { 'content-type': 'application/json' },
        { name, surname, username, password, favorites: [] },
        (error, response) => {
            if (error) expression(error)
            else if (response.status === 'KO') expression(new Error(response.error))
            else expression()
        }
    )
}
