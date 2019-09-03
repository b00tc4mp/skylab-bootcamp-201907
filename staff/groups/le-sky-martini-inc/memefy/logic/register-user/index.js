/**
 * Register new users to Herokuapp's API via form.
 * If the user is already registered API returns a error message.
 * If the register goes well, API returns a 'KO' status and an error message.
 * 
 * @param {String} name User's name.
 * @param {String} surname User's surname.
 * @param {Email} username User's email.
 * @param {String} password User's desired password.
 * @param {String} repassword User's repeated password.
 * 
 * 
 * @return {Object} Response: { status, data { id } }
 */



logic.registerUser = function (name, surname, username, password, repassword) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
    validate.string(repassword, 'password repeat')

    if (password !== repassword) throw new Error('passwords do not match')

    return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, { name, surname, username, password, favorites: [] })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
        })
}


