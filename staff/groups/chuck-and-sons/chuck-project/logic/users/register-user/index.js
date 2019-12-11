/**
 * Retrieves user data previous validated arguments 
 *
 * @param {String} user name.
 * @param {String} user surname.
 * @param {String} user username [email].
 * @param {String} user password.
 * @param {String} user re-password [only for synchronous validation].
 * 
 * @throws {Error} When repassword doesn't match with password.
 * @throws {Error} When user API cannot register the user.
 */

logic.registerUser = function (name, surname, username, password, repassword) {
    validate.str(name, 'name')
    validate.str(surname, 'surname')
    validate.str(username, 'username')
    validate.email(username, 'username')
    validate.str(password, 'password')
    validate.str(repassword, 'repassword')

    if (password !== repassword) throw new Error("password doesn't match")

    const user = {
        "name": name,
        "surname": surname,
        "username": username,
        "password": password,
        "project": "chuck",
        "favorites": []
    }

    return call("https://skylabcoders.herokuapp.com/api/user", 'post', { 'content-type': 'application/json' }, user)
        .then(response => {
            if (response.status === 'KO') throw Error(response.error)
        })
}